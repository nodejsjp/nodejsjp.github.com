const bulbo = require('bulbo')
const asset = bulbo.asset

const frontMatter = require('gulp-front-matter')
const nunjucks = require('gulp-nunjucks')
const marked = require('gulp-marked')
const layout = require('layout-wrapper')

const orgName = 'Node.js 日本ユーザーグループ'
const pages = require('./pages')

const data = {orgName, pages}

bulbo.dest('build') // Sets the destination
bulbo.port(3100) // Sets the dev server's port

asset('source/**/*.md')
  .watch('source/**/*.{md,njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(nunjucks.compile(data))
  .pipe(marked())
  .pipe(layout.nunjucks({
    data,
    layout: 'source/layout',
    extname: '.njk'
  }))

asset('source/css/*.css')
  .base('source')

asset('source/images/**/*')
  .base('source')
