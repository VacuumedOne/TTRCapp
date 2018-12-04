# 開発のはじめかた
### 根幹のソフト
- homebrewのインストール
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew -v


- nodebrewのインストール
brew install nodebrew
nodebrew -v

- node.jsのインストール
mkdir -p ~/.nodebrew/src
nodebrew ls-remote //バージョンを選ぶ
nodebrew install-binary {version}
node -v

---
---
# 作業するときは...
ちゃんとforkして、自分のリポジトリをclone。
間違えてもmasterにpushせず、branchを切ってから編集し、pull-requestを送ってね。

---
---
# コード規約
追記する
