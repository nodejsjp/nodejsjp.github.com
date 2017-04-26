const bulbo = require('bulbo')
const asset = bulbo.asset

const path = require('path')
const frontMatter = require('gulp-front-matter')
const nunjucks = require('gulp-nunjucks')
const marked = require('gulp-marked')
const wrapper = require('layout-wrapper')
const accumulate = require('vinyl-accumulate')

const data = {
  orgName: 'Node.js 日本ユーザーグループ',
  pages: require('./pages'),
  layoutDir: path.join(__dirname, 'source/layout'),
  basepath: process.env.BASEPATH || ''
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

asset('source/events/**/*.md')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(accumulate('index.html', {
    debounce: true,
    sort: (x, y) => y.fm.date[0].valueOf() - x.fm.date[0].valueOf()
  }))
  .pipe(layout('index'))

asset('source/events/**/*.md')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(accumulate('events.html', {
    debounce: true,
    sort: (x, y) => y.fm.date[0].valueOf() - x.fm.date[0].valueOf()
  }))
  .pipe(layout('event-index'))

asset('source/events/**/*.md')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(layout('event'))

asset('source/news/**/*.md')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(accumulate('news.html', {
    debounce: true,
    sort: (x, y) => y.fm.date.valueOf() - x.fm.date.valueOf()
  }))
  .pipe(layout('news-index'))

asset('source/news/**/*.md')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(layout('news'))

asset('source/jobs/**/*.md')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(accumulate('jobboard.html', {
    debounce: true,
    sort: (x, y) => y.fm.postedAt.valueOf() - x.fm.postedAt.valueOf()
  }))
  .pipe(layout('jobboard'))

asset('source/jobs/**/*.md')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(layout('job'))

asset('source/css/*.css')

asset('source/images/**/*.{png,svg,jpg,jpeg,gif}')

asset('./old/*.*').base('./')
