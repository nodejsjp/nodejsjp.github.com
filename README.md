# [nodejs.jp][homepage]

# ビルド

    npm run build

`build/` 以下にサイトが生成されます。

# 開発サーバ起動

    npm run server

`localhost:3100` に開発用サーバが立ち上がります。

# 開発用ドキュメント

- SITEMAP.md
  - サイトマップ
- TODO.md
  - TODO リスト (不要になったら消してください)

# Event を追加する

`source/events/YYYY/MM-DD-イベント名.md` というファイル名で下のような front-matter つき markdown ファイルを追加してください。

***Note***: path がそのまま URL になるため、URL で利用可能な path 名を選んでください。

```md
---
name: 東京Node学園祭2016
image: images/nodefest-2016.png
date:
  - 2016-11-12
  - 2016-11-13
venue:
  - 1日目 イベント＆コミュニティスペース dots.
  - 2日目 渋谷マークシティ
ticket:
  - url: http://nodejs.connpass.com/event/43011/
    name: 東京Node学園祭2016 (1日目)
  - url: http://nodejs.connpass.com/event/42182/
    name: 東京Node学園祭2016 (2日目)
site:
  name: オフィシャルサイト
  url: http://nodefest.jp/2016/
---

近年、Node.jsを利用する機会は飛躍的に増えています。クライアントサイドのビルドモジュールやAWS Lambda, WebSocket を使ったリアルタイムウェブアプリケーション、軽量エンジンであることを活かしたIoTでの利用、デスクトップアプリ等、適用範囲が増えています。また昨今のECMAScript 2016が仕様化されたこと、Node.jsとio.jsの分裂と統合等のドラマを経てより一層の注目が期待されます。

...
```

フロントマターの意味

- {string} name - イベント名 (必須)
- {string} image - 画像の path (path は `source` からの相対 path で入力してください。対応する画像を一緒にコミットしてください) (省略可)
- {string[]} date - 実施日の配列 (必須、最低1件)
- {string[]} venue - 会場名の配列 (必須、最低1件)
- {Ticket[]} ticket - チケットの配列 (必須、最低1件)
- {string} ticket[].name - チケット(のリンク)名 (必須)
- {string} ticket[].url - チケットのリンク先 (必須)
- {string} site.name - イベントオフィシャルサイト名 (省略可)
- {string} site.url - イベントオフィシャルサイトURL (省略可)

# News を追加する

`source/news/YYYY/MM-DD-title.md` というファイル名で下のような front-matter つき markdown ファイルを追加してください。

***Note***: path がそのまま URL になるため、URL で利用可能な path 名を選んでください。

```md
---
title: Node v7 がリリースされました。
date: 2016-10-25
author: kt3k
---

Node v7 がリリースされています。詳しくは下記、公式のニュースリリース参照。

https://nodejs.org/en/blog/release/v7.0.0/
```

フロントマターの意味

- {string} title - 記事のタイトル (必須)
- {string} date - 記事の日付 (必須)
- {string} author - 記事の作者 (省略可)

# 求人情報を追加する

`source/jobs/会社名.md` というファイル名で下のような front-matter つき markdown ファイルを追加してください。

***Note***: path がそのまま URL になるため、URL で利用可能な path 名を選んでください。

```md
---
postedAt: 2016-10-10
name: 株式会社リンクリンク
image: images/company-logo/linklink.svg
role:
  - Node.js プログラマ
  - ディレクター
url: https://www.google.com/
---

当社は1945年設立、2011年マザーズ上場の若い企業で、街コンワールド( http://machicon-world.com/ )という街コンポータルサイトを運営しています。
```

フロントマターの意味

- {string} postedAt - 掲載日 (必須)
- {string} name - 会社名 (求人名) (必須)
- {string} image - 画像の path (path は `source` からの相対 path で入力してください。対応する画像を一緒にコミットしてください) (省略可)
- {string[]} role - 募集職種の配列、(必須、最低1件)
- {string} url - 求人情報の詳細/応募フォームなどへのリンク先 (必須)

# その他のページを編集する

以下の対応するファイルを編集してください。

- index.html - `source/layout/index.njk`
- about.html - `source/about.md`
- events.html - `source/layout/event-index.njk`
- contact.html - `source/about.md`
- docs.html - `source/about.md`
- news.html - `source/layout/news-index.njk`
- jobboard.html - `source/layout/job-index.njk`

***Note***: `.njk` 拡張子のファイルは [nunjucks][nunjucks] テンプレートです。記法は [nunjucks のドキュメント][nunjucks-tmpl-doc] を参照してください。

# デザインを変更する

各ページのベースのテンプレート `source/layout/layout.njk` を編集してください。

# それ以上の細かい修正

[bulbo][bulbo] を使ってビルドしています。具体的にどのファイルがどういうパイプラインでビルドされているかは、`bulbofile.js` を参照してください。bulbofile.js の記法については、[bulbo][bulbo] の README を参照してください。

bulbo の各パイプラインは gulp-plugin (vinyl stream の duplex) の連鎖で成り立ってます (gulp の各タスクと同様)。各パイプラインの各ノードの挙動については各 gulp-plugin のドキュメントを参照してください。

ビルドがうまくいかない/何かが分からないなどの場合は @kt3k まで問い合わせてください。( https://twitter.com/kt3k )

[homepage]: http://nodejs.jp
[bulbo]: https://github.com/kt3k/bulbo
[nunjucks]: http://mozilla.github.io/nunjucks/
[nunjucks-tmpl-doc]: https://mozilla.github.io/nunjucks/templating.html
