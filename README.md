# 開発のはじめかた
### 根幹のソフト
- homebrewのインストール
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew -v


- nodebrewのインストール
```
brew install nodebrew
nodebrew -v
```

- node.jsのインストール
```
mkdir -p ~/.nodebrew/src
nodebrew ls-remote //バージョンを選ぶ
nodebrew install-binary {version}
node -v
```

---
---

# 作業するときは...
ちゃんとforkして、自分のリポジトリをclone。
間違えてもmasterにpushしないこと。
1. 作業のはじめにpull
2. branchを切ってから編集
3. コミットしてからpull-requestを送る

---
---

# コード規約
追記する
