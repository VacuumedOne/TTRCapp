# Group User
+ Userについて
  + 一人一つもつデータ群です。名前の他にハッシュ化されたパスワードやメールアドレス、権限なども保持しています。

+ 権限について
  + 権限(auth)に入る値は以下の通り。
    + 0:unauthorized 操作不可
    + 1:admin 全ての管理が行える唯一の管理者
    + 2:supporter サポーター。他人の記録を登録することができる。コックス、マネージャー、トレーナーがなることを推奨。設定から3になれる。
    + 3:player 選手。自分の記録を行うことを主とする。人の記録を登録することはできないが、設定から2に変化できるので実質的な権限は2と同じ。(フロントの表示の差ということ)
    + 4:viewer ビューア。監視用。記録を見たいOB方や外部コーチなどに見せるのに使える。

## 新規ユーザ登録 [/user/register/api]

### 新規ユーザ登録 [POST]
ユーザ情報を投げると、新規ユーザ登録の処理を行います。
ユーザ名やメールアドレスはユニークでなければいけません。

+ Request example
  + Body
    ```json
      {
        "user_name": "tsubakuro",
        "password": "password",
        "mail": "tsubakuro@m.titech.ac.jp",
        "sex": "male",
        "auth": 3,
        "birth_ymd": "1995-04-01",
        "k_lastname": "漢字の姓",
        "k_firstname": "漢字の名",
        "h_lastname": "ひらがなの姓",
        "h_firstname": "ひらがなの名"
      }
    ```

+ Response 200
  + Body
    ```json
      {
        "id": 10,
        "user_name": "tsubakuro",
        "mail": "tsubakuro@m.titech.ac.jp",
        "sex": "male",
        "auth": 3,
        "birth_ymd": "1995-04-01",
        "k_lastname": "漢字の姓",
        "k_firstname": "漢字の名",
        "h_lastname": "ひらがなの姓",
        "h_firstname": "ひらがなの名",
        "is_active": true
      }
    ```
+ Response 400
  + 入力に不足があった場合です。

  + Body
    ```json
      [
        "メールアドレスが入力されていません"
      ]
    ```
+ Response 500
  + サーバ側の問題です。
  + Body

## ユーザ一覧取得 [/user/list/api]

### ユーザ一覧取得 [POST]
ユーザ情報を全取得します。
ユーザのグループなどは今のところ存在していないので、全件取得です。
+ Request example
  + Body
    ```
    なし
    ```

+ Response 200
  + Body
    ```json
    [
      {
        "id": 10,
        "user_name": "tsubakuro",
        "mail": "tsubakuro@m.titech.ac.jp",
        "sex": "male",
        "auth": 3,
        "birth_ymd": "1995-04-01",
        "k_lastname": "燕",
        "k_firstname": "太郎",
        "h_lastname": "つばくろ",
        "h_firstname": "たろう",
        "is_active": true
      },
      {
        "id": 11,
        "user_name": "tsubaki",
        "mail": "tsubaki@m.titech.ac.jp",
        "sex": "female",
        "auth": 4,
        "birth_ymd": "1995-04-01",
        "k_lastname": "燕",
        "k_firstname": "花子",
        "h_lastname": "つばくろ",
        "h_firstname": "はなこ",
        "is_active": true
      }
    ]
    ```
+ Response 500
  + サーバ側の問題です。
  + Body

# Group RecordGroup

+ RecordGroupについて
  + RecordGroupは記録のグループを保持します。
  + 記録のグループとは、例えばエルゴ、ウェイト、体組成などの、グループです。
  + RecordGroupと以下に記載するRecordItemで、一つの種目("エルゴ"の"2000m"など)を一意に決定します。
  + 操作の頻度はかなり少ないです。

## 新規記録グループ登録 [/record-group/register/api]

### 新規記録グループ登録 [POST]
グループ名を投げると、新規記録グループ登録の処理を行います。
グループ名やはユニークでなければいけません。

+ Request example
  + Body
    ```json
      {
        "group_name": "エルゴ"
      }
    ```

+ Response 200
  + Body
    ```json
      {
        "id": 1,
        "group_name": "エルゴ"
      }
    ```
+ Response 400
  + 入力に不足があった場合です。
  + Body
    ```json
      [
        "グループ名が入力されていません"
      ]
    ```
+ Response 500
  + サーバ側の問題です。
  + Body

## 記録グループ一覧取得 [/record-group/list/api]

### 記録グループ一覧取得 [POST]
記録グループの全件取得です。

+ Response 200
  + Body
    ```json
      [
        {
          "id": 0,
          "group_name": "エルゴ"
        },
        {
          "id": 1,
          "group_name": "ウェイト"
        }
      ]
    ```
+ Response 500
  + サーバ側の問題です。
  + Body

# Group RecordItem

## 記録アイテム登録 [/record-item/register/api]

### 記録アイテム登録 [POST]

+ Request example
  + Body
    ```json
      {
        "group_id": 1,
        "item_name": "2000m",
        "unit": ""
      }
    ```

+ Response 200
  + Body
    ```json
      {
        "id": 1,
        "item_name": "2000m",
        "group_id": 1,
        "unit": ""
      }
    ```
+ Response 400
  + 入力に不足があった場合です。
  + Body
    ```json
      [
        "グループ名が入力されていません"
      ]
    ```
+ Response 500
  + サーバ側の問題です。
  + Body

## 記録アイテム取得 [/record-item/list/api]

### 記録アイテム登録 [POST]

+ Request example
  + Body
    ```json
      {
        "group_id": 1
      }
    ```

+ Response 200
  + Body
    ```json
      [
        {
          "id": 1,
          "item_name": "2000m",
          "unit": ""
        },
        {
          "id": 2,
          "item_name": "10分",
          "group_id": 1,
          "unit": ""
        }
      ]
    ```
+ Response 400
  + 入力に不足があった場合です。
  + Body
    ```json
      [
        "グループIDが入力されていません"
      ]
    ```
+ Response 500
  + サーバ側の問題です。
  + Body


# Group Record

## 記録登録 [/record/register/api]

### 記録登録 [POST]
記録を追加します。
+ Request example
  + Body
    ```json
      {
        "id": 2,
        "item_id": "11",
        "player_id": "1",
        "registerer_id": "1",
        "result": "1:40",
        "date": "2019-01-01",
      }
    ```
+ Response 200
  + Body
    ```json
      {
        "id": 2,
        "item_id": "11",
        "player_id": "1",
        "registerer_id": "1",
        "result": "1:40",
        "date": "2019-01-01T00:00:00.000Z",
        "updatedAt": "2019-02-07T10:46:20.014Z",
        "createdAt": "2019-02-07T10:46:20.014Z"
      }
    ```
+ Response 500
  + サーバ側の問題です。
  + Body