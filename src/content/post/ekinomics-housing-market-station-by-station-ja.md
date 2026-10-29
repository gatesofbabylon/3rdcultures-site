---
cover: /images/posts/ekinomics-housing-market-station-by-station-ja/ekinomics-5-central-london-growth-ja.jpg
description: Ekinomics を公開した。日本とイギリス47都市の住宅価格を、駅ごとに地図にした。首都圏の中央線から福岡、ロンドンまで、なぜ駅が大事な単位なのか。
draft: false
lang: ja
publishDate: '2026-10-28'
tags:
- ekinomics
- house-prices
- japan
- britain
- transit-maps
title: Ekinomics：日本とイギリスの住宅価格を、駅ごとに読む
translation: ekinomics-housing-market-station-by-station
---

*[Read this in English](https://3rdcultures.com/posts/ekinomics-housing-market-station-by-station/)*

もう10年くらい、[SUUMO](https://suumo.jp/) の「価格マップ」をスキャンして Google フォトのアルバムに溜めている。そのアルバムが、日本とイギリスの住宅価格を駅ごとに地図にした Ekinomics になった。

あの図がずっと好きだった。個々の数字というより、あの見せ方そのものが、その先にある市場について語っていることが面白かった。不動産市場は価格動向の細かい情報に飢えている。そして日本の都市では、人が住まいを考える道筋からして、駅ごとに区切った価格マップに自然と行き着く。路線図のような形で。というより、路線図そのものの上に。（昔から路線図オタクなので、それもある。）

![Suumo Price map – Greater Tokyo collage](/images/posts/ekinomics-housing-market-station-by-station-ja/suumo-price-map-greater-tokyo-collage.jpg)
*アルバムから：SUUMO の価格マップ、首都圏の中心部・南部・西部・東部。*

理由はだいたい、日本の都市の仕組みにある（日本に住んでいる人には言うまでもない話だろうけど）。大都市のほとんどでは、通勤といえば電車で、通勤のしやすさ、もっと言えば交通の便全般が、家を買う人にとって大きな判断材料になる。だから価格は市ごとでも区ごとでもなく、駅ごとに追うのが理にかなっている。人が実際に選んでいるのは駅なのだ。こういうデザインを日本人が好む、という要因もあるかもしれない。

![Suumo land prices map – Fukuoka & Sapporo](/images/posts/ekinomics-housing-market-station-by-station-ja/suumo-land-prices-map-fukuoka-sapporo.jpg)
*SUUMO の福岡と札幌の地価マップ。*

この記事は、そのアルバムの進化系の話だ。[Ekinomics](https://ekinomics.com/?lang=ja) は、日本とイギリスの主要都市の不動産の相場とその推移を、駅ごとに地図にしている。

## スキャンからデータへ

何年も、SUUMO のスキャンを何か構造化したいと思っていた。価格の推移を時系列で検索できるデータベースにして、どのエリアの価値が上がっていて下がっているのかを図式化してみたかった。

問題はデータの偏りだった。SUUMO データは新築マンション寄りで、それはもちろん偶然ではない。SUUMO はリクルートのメディアで、不動産デベロッパーからの収入に支えられている。いわば新築産業複合体の一角だ。批判しているつもりはない（物事のあり方を説明しようとすれば、お金の流れを追うのは自然）。ただ、そのせいでマップが役に立つのは主に新築マンションを探している人で、そうでなければあまり使えなかった。

![Suumo Tokyu Rail – special feature](/images/posts/ekinomics-housing-market-station-by-station-ja/suumo-tokyu-rail-special-feature.jpg)
*東急線沿線に住む理由を集めた SUUMO の特集。*

それに、地域ごとのトレンドは、新築だけの話ではない。戸建ても新築マンションも中古マンションも含めた市場全体の話だ。

それでも最初は、SUUMOアルバムが指す方向から始めた。スキャン画像をどうデジタル化して、数字にどう構造を持たせるか。

そのうちに、もっと適切なデータがすでに公開されていると知った。国土交通省の[不動産情報ライブラリ](https://www.reinfolib.mlit.go.jp/realEstatePrices/)は、買主へのアンケート調査にもとづく取引価格を公開している。マンション、戸建て、土地を、2005年から四半期ごとに。しかもすべての記録に最寄り駅が書いてある。僕が欲しかったのは、この単位だ。

ちょうどバイブコーディングにハマっていて、次のプロジェクトを探していたところでもあった。それで、週末を使って作った。

## イギリス版を作る

日本の三大都市圏（首都圏、関西、東海）ができたところで、生まれ故郷のロンドンでもできないかと考えた。

調べてみると、イギリスにも似たようなデータがある。土地登記所（HM Land Registry）が、1995年以降にイングランドとウェールズで販売されたすべての住宅の価格を記録している（[Price Paid Data](https://www.gov.uk/government/statistical-data-sets/price-paid-data-downloads)）。そしてイギリスにも公共交通中心の住宅市場がある。いちばんわかりやすいのはロンドンとその通勤圏だが、ほかにもニューカッスルのメトロなどある（中には路面電車も）。同じことをやってみる価値はありそうだった。

ただ、そのまま移植とはいかなかった。土地登記所の記録には買い手が払った金額はあっても、物件の広さのデータがない。それだけでは㎡単価が出せない。足りないピースを埋めてくれたのは [UCL（ユニバーシティ・カレッジ・ロンドン）の研究者たち](https://reshare.ukdataservice.ac.uk/857911/)で、売買記録を[エネルギー性能証明書（EPC）](https://www.gov.uk/buy-sell-your-home/energy-performance-certificates)と突き合わせていた。こちらには床面積が載っている。スコットランドと北アイルランドには、それぞれ別のデータが必要だった。[スコットランドの登記機関（Registers of Scotland）](https://data.gov.scot/dataset/house_prices___residential_properties_sales_and_price)も[北アイルランドの土地・資産管理機関（Land & Property Services）](https://www.opendatani.gov.uk/dataset/northern-ireland-annual-descriptive-house-price-statistics-electoral-ward-level)も、売買を1件ずつではなく地域単位で公開していて、床面積もない。なのでスコットランドとベルファストの地図は、㎡ではなく1戸あたりの価格を出している。

そして、単位そのもの、つまり駅の問題がある。

上述のように、日本の不動産市場は駅で考える。イギリスの市場はどちらかというと郵便番号（ポストコード）で考える。でもポストコードは駅に割り当てることができる（各取引を1.2 km以内の最寄り駅に数えている）。そうすると、日本式の住宅価格マップがイギリスでも描ける。他の誰かがやっているのは見たことがなかった。イギリスで家を買う人が本当にそういう選び方をしているのかは、もっともな疑問だと思う。それでも、2つの国を同じ条件で並べることはでき、AIの力を借りれば時間も労力もかからないので、とにかく作ってみた。

## サイトの中身

こうしてできたのが Ekinomics（駅＋エコノミクス）だ。2026年10月28日時点で、29枚の地図に47都市が入っている。日本は札幌から那覇まで25都市、イギリスはボーンマスからアバディーン、さらに海を渡ってベルファストまで22都市。日本の取引記録が約450万件、イギリスの売買が約570万件、駅の数はおよそ9,900。首都圏だけで190万件弱、1,966駅ある。[トップページ](https://ekinomics.com/?lang=ja)では各都市の2014〜15年からの価格変化を地図にしているので、まずはそこから見るといい。

各駅には㎡あたりの価格の中央値が出ていて（スコットランドとベルファストの地図は1戸あたり）、2006〜07年から2年ごとに区切ってある。スライダーで時間を動かすと地図の色が変わっていくのが見えるし、「変化率」に切り替えれば、選んだ年から各駅がどれだけ動いたかがわかる。物件の種類（マンション、戸建て、土地など）も切り替えられる。日本語と英語の両方に対応している。

## 見どころをいくつか

下のリンクは、それぞれの地図を説明どおりの表示で開く。わざわざ探すのが面倒なら、どのページにも「2014〜15年からの上昇率上位」というプリセットがある。

### 日本

![Ekinomics の首都圏マップ：2024〜25年の駅ごとの住宅㎡単価。都心が最も高く、外へ行くほど下がる](/images/posts/ekinomics-housing-market-station-by-station-ja/ekinomics-1-tokyo-price-map-bullseye-ja.jpg)
**首都圏は日の丸型。** [2014〜15年を基準に「変化率」に切り替えてみる](https://ekinomics.com/shutoken/tokyo/?view=change&lang=ja)。東京駅から5 km以内の典型的な駅は、2024〜25年までに約70%上がっている。5〜15 kmで約58%、15〜30 kmで約37%、30〜60 kmで約20%。60 kmより先では下がっている。上昇率の上位6駅のうち3駅（六本木一丁目、神谷町、半蔵門）は都心のど真ん中だ。通勤の話とつじつまが合う。言わずもがなかもしれないが、日本の大都市の典型的な買い手がお金を払っているのは、利便性だ。

![Ekinomics の中央線マップ：東京から八王子まで、2024〜25年の駅ごとの住宅㎡単価。新宿より西でも高いまま](/images/posts/ekinomics-housing-market-station-by-station-ja/ekinomics-2-tokyo-prices-on-the-chuo-line-ja.jpg)
**中央線を西へたどってみよう。** 日の丸と言ったが、まん丸ではないことがわかる。東京の地図で「路線」メニューから[中央線を選び](https://ekinomics.com/shutoken/tokyo/?line=chuo-line-jr-east&lang=ja)、新宿より西で何が起きるかを見てほしい。最初の17 km、価格はほとんど下がらない。中野周辺の住宅は、2024〜25年に㎡あたり中央値約113万円で売れていた。23区の外に出た吉祥寺周辺でも約103万円で、23区内の典型的な駅（約109万円）に近い。路線を問わず、東京駅から17 kmの典型的な駅は約61万円だ。32 km離れた立川でも、同じ距離の典型的な駅の2倍以上で売れている。

10〜35 kmの区間で、いくつかの路線を同じ距離の典型的な駅と比べるとこうなる。

| 路線 | 同じ距離の典型的な駅と比べて |
|---|---|
| 中央線 | 約46%高い |
| 東横線、田園都市線 | 約30%高い |
| 京王線 | 約17%高い |
| 西武線 | ほぼ同じ水準 |
| 東上線、総武線（都心より東）、常磐線 | 下回る |

つまり、中央線・東急線・京王線のブランドプレミアムはこのデータによって裏付けられていることがわかる。八王子まで行くと、中央線でもプレミアム効果はすでに消滅している。

![Ekinomics のつくばエクスプレスマップ：秋葉原から延びる路線の、2014〜15年からの駅ごとの住宅価格の変化率](/images/posts/ekinomics-housing-market-station-by-station-ja/ekinomics-3-tokyo-tsukuba-express-growth-ja.jpg)
**つくばエクスプレスの成長物語。** [開業は2005年](https://ja.wikipedia.org/wiki/%E9%A6%96%E9%83%BD%E5%9C%8F%E6%96%B0%E9%83%BD%E5%B8%82%E9%89%84%E9%81%93%E3%81%A4%E3%81%8F%E3%81%B0%E3%82%A8%E3%82%AF%E3%82%B9%E3%83%97%E3%83%AC%E3%82%B9)とまだ新しく、秋葉原から北東へ延びている。[この路線を選んで2014〜15年基準の「変化率」に切り替える](https://ekinomics.com/shutoken/tokyo/?view=change&line=tsukuba-express-metropolitan-intercity-railway&lang=ja)と、典型的な駅は約49%上がっている。首都圏全体は36%だ。流山おおたかの森は2倍以上になった。

![Ekinomics の福岡マップ：2014〜15年からの駅ごとの住宅価格の変化率。天神や祇園の上昇が大きい](/images/posts/ekinomics-housing-market-station-by-station-ja/ekinomics-4-fukuoka-vs-tokyo-growth-ja.jpg)
**福岡は東京をの上昇率を上回る。** [典型的な駅](https://ekinomics.com/fukuoka/fukuoka/?view=change&lang=ja)は2014〜15年から約51%上がっている。首都圏は36%、大阪と名古屋は20%未満。市の真ん中にある天神と祇園が上昇率の上位に入っている。福岡については食とスタートアップの絶賛しか耳にしないので、イメージ通り。

### イギリス

![Ekinomics のロンドンマップ：2014〜15年から2022〜23年の駅ごとの住宅価格の変化率。中心部は下落](/images/posts/ekinomics-housing-market-station-by-station-ja/ekinomics-5-central-london-growth-ja.jpg)
**ロンドン中心部の一等地は値下がりした。** [ロンドンの地図の「変化率」表示](https://ekinomics.com/southeast/london/?view=change&lang=ja)で見ると、2014〜15年から2022〜23年の間に、Knightsbridge（ナイツブリッジ）、Oxford Circus（オックスフォード・サーカス）、Waterloo（ウォータールー）はいずれも15〜17%下がり、Kensington（Olympia、ケンジントン・オリンピア）は約4分の1も下がった。同じ期間に Margate（マーゲート）はほぼ倍になり、St Leonards（Warrior Square、セント・レナーズ）は8割以上上がった。全国でも中堅都市が首都に勝っている。North West、Birmingham、Bristol の各ページでは典型的な駅が約52%上がっているのに対し、London のページ（通勤圏を含む）は34%だ。

![Ekinomics のマンチェスターとリヴァプールのマップ：2022〜23年の駅ごとの住宅㎡単価](/images/posts/ekinomics-housing-market-station-by-station-ja/ekinomics-6-manchester-liverpool-twin-cities-ja.jpg)
**リヴァプールとマンチェスターは正反対の形をしている。** メニューから [Liverpool](https://ekinomics.com/northwest/liverpool/?lang=ja) か [Manchester](https://ekinomics.com/northwest/manchester/?lang=ja) を選んで（同じ地図に入っている）、2つを比べてみてほしい。リヴァプールは中心から離れるほど高くなる（中心のすぐ外で一度下がってから）。マンチェスターは逆で、平均すると中心部がいちばん高い（日本の大都市みたいな形）。

| 典型的な駅、2022〜23年、㎡あたり | リヴァプール（中心駅 Lime Street から） | マンチェスター（中心駅 Piccadilly から） |
|---|---|---|
| 3 km以内 | 2,200ポンド | 3,600ポンド |
| 3〜8 km | 1,750ポンド | 3,100ポンド |
| 8〜15 km | 2,500ポンド | 2,750ポンド |
| 15〜25 km | 2,650ポンド | 2,850ポンド |

リヴァプール側でいちばん高い駅は、ウィラル半島や海岸沿いを北に上ったあたりにある（Heswall、West Kirby、Freshfield）。マンチェスターの最上位は南の郊外にある（Hale、Didsbury Village、Timperley、Alderley Edge）が、中心部はリヴァプールにはない形で価値を保っている。[世界初の都市間鉄道](https://ja.wikipedia.org/wiki/%E3%83%AA%E3%83%B4%E3%82%A1%E3%83%97%E3%83%BC%E3%83%AB%E3%83%BB%E3%82%A2%E3%83%B3%E3%83%89%E3%83%BB%E3%83%9E%E3%83%B3%E3%83%81%E3%82%A7%E3%82%B9%E3%82%BF%E3%83%BC%E9%89%84%E9%81%93)（スティーブンソンの偉業）の両端にある双子の都市が、それぞれ相手の裏返しの構造になっているのが面白い。

## 数字について一言

どれも中央値で、きちんとした価格指数ではないし、インフレ調整もしていない。ある期間に、ある駅の取引が広い物件や新しい物件に偏れば、どの家の価値も上がっていなくても中央値は動く。だからサイトでは、それぞれの数字の裏にある取引件数や、広さと築年数の構成も見せているし、意味のある比較にならないほど取引が少ないところでは比較を出していない。イギリスのデータは今のところ2023年まで。床面積の紐づけがそこまでだからだ（スコットランドとベルファストの地図も同じ期間にそろえている）。日本のデータは2025年まである。

不動産オタクにも鉄道オタクにも、その両方にも、マタタビのようなものになってくれたらうれしい。イギリスと日本、どちらからの反応が多いのか、ちょっと楽しみにしている。

全部 [ekinomics.com](https://ekinomics.com/?lang=ja) にあるので、自分の土地勘と答え合わせしてみて色々いじり、楽しんでもらえたらぜひ教えてほしい。[Twitter](https://x.com/philgpearson), [Instagram](https://www.instagram.com/philgpearson/)でぜひコンタクトを。