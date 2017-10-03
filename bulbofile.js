const bulbo = require('bulbo')
const asset = bulbo.asset

const path = require('path')
const frontMatter = require('gulp-front-matter')
const nunjucks = require('gulp-nunjucks')
const marked = require('gulp-marked')
const wrapper = require('layout-wrapper')
const accumulate = require('vinyl-accumulate')
const branch = require('branch-pipe')

const data = {
  orgName: 'Node.js 日本ユーザーグループ',
  pages: require('./pages'),
  layoutDir: path.join(__dirname, 'source/layout'),
  // file を受け取って root への相対パスを返す関数
  basepath: file => path.dirname(path.relative(file.relative, ''))
}

require('nunjucks').configure().addFilter('date', require('nunjucks-date'))

bulbo.dest('build') // Sets the destination
bulbo.port(3100) // Sets the dev server's port
bulbo.base('source')
bulbo.loggerTitle('nodejsjp')

const layout = defaultLayout => wrapper.nunjucks({
  data,
  defaultLayout,
  layout: 'source/layout',
  extname: '.njk'
})

asset('source/**/*.md', '!source/{events,jobs,news}/**/*')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(nunjucks.compile(data))
  .pipe(marked())
  .pipe(layout('default'))

// Index page
asset('source/events/**/*.md')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(accumulate('index.html', {
    debounce: true,
    sort: (x, y) => y.fm.date[0].valueOf() - x.fm.date[0].valueOf(),
    filter: (x) => x.fm.date[0].valueOf() > Date.now() // filter the past events
  }))
  .pipe(layout('index'))

// Event pages
asset('source/events/**/*.md')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(branch.obj(src => [
    src
      .pipe(accumulate('events.html', {
        debounce: true,
        sort: (x, y) => y.fm.date[0].valueOf() - x.fm.date[0].valueOf()
      }))
      .pipe(layout('event-index')), // Event index page
    src
      .pipe(layout('event')) // Single event page
  ]))

// News pages
asset('source/news/**/*.md')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(branch.obj(src => [
    src
      .pipe(accumulate('news.html', {
        debounce: true,
        sort: (x, y) => y.fm.date.valueOf() - x.fm.date.valueOf()
      }))
      .pipe(layout('news-index')), // News index page
    src
      .pipe(layout('news')) // Single news page
  ]))

const postedAt = x => x.fm.postedAt ? x.fm.postedAt.valueOf() : 0
// Jobboard pages
asset('source/jobs/**/*.md')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(branch.obj(src => [
    src
      .pipe(accumulate('jobboard.html', {
        debounce: true,
        sort: (x, y) => postedAt(y) - postedAt(x)
      }))
      .pipe(layout('jobboard')), // Job index page
    src
      .pipe(layout('job')) // Single job page
  ]))

asset('source/css/*.css')
asset('source/images/**/*.{png,svg,jpg,jpeg,gif}')

// Old site is available under http://nodejs.jp/old/
asset('./old/*.*').base('./')
