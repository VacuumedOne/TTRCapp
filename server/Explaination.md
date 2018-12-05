# サーバー側の設計

## ルーティング
まず、terminal上で/TTRCapp/serverに移動し、サーバを起動する。
```
npm start
```
localhost:3000にアクセスすることでサーバーサイドが動く。
|method|URL|説明|
|:-:|:-|:-|
|GET|/|Expressにごあいさつ|
|GET|/test/login/register|新規ユーザ追加画面(テスト用)|
|GET|/test/login/login|ログイン情報入力画面(テスト用)|
|GET|/test/login/success|ログイン完了画面(テスト用)|
|GET|/test/user/list|ユーザ一覧(テスト用)|
|POST|/user/register|新規ユーザ情報をPOST|
|POST|/user/get|ユーザ名とパスワードをPOSTして、ユーザ情報入手(ログイン時に使う)|
|POST|/user/delete|ユーザを削除(ユーザ退会)|
|POST|/user/update|ユーザ情報を更新|
|GET|/test/record/ergo|エルゴ記録入力画面(テスト)|
|GET|/test/record/success|記録入力完了画面(テスト)|
|GET|/test/record/list|エルゴ記録の全取得(テスト)|
|POST|/record/ergo/register|エルゴ情報のPOST|
|POST|/record/ergo/delete|エルゴ記録の削除|

---
---

## データベース設計

### rowingkuramae:Users
登録したユーザの情報を管理する
|カラム名|型|属性|説明|
|:--|:--|:--|:--|
|user_id|INT|NOT NULL, PRIMARY KEY, AUTO_INCREMENT|一意にユーザを決めるためのID。タプルを削除しても増えていく。|
|user_name|||小文字アルファベットのユーザ名|
|hashed_pw|||ハッシュ化されたパスワード|
|sex|||性別|
|auth|||権限(*表の下に詳細を記載)|
|birth_ymd|||生年月日|
|k_lastname|||漢字表記の姓|
|k_firstname|||漢字表記の名|
|h_lastname|||ひらがな表記の姓|
|h_firstname|||ひらがな表記の名|
|is_active|||現役か否かのフラグ。記録の表示如何に関わる。|
|d_flg|||論理削除のフラグ。基本的にはこちらで削除を行う。|

*権限に入る値は以下の通り。
- 0:unauthorized 操作不可
- 1:admin 全ての管理が行える唯一の管理者
- 2:supporter サポーター。他人の記録を登録することができる。コックス、マネージャー、トレーナーがなることを推奨。設定から3になれる。
- 3:player 選手。自分の記録を行うことを主とする。人の記録を登録することはできないが、設定から2に変化できるので実質的な権限は2と同じ。(フロントの表示の差ということ)
- 4:viewer ビューア。監視用。記録を見たいOB方や外部コーチなどに見せるのに使える。

---

### rowingkuramae:RecordGroups
記録のグループを保持する。記録のグループとは、例えばエルゴ、ウェイト、体組成などの、グループである。RecordGroupと以下に記載するRecordItemで、一つの種目("エルゴ"の"2000m"など)を一意に決定する。

|カラム名|型|属性|説明|
|:--|:-:|:--|:--|
|group_id|INT|NOT NULL, PRIMARY KEY, AUTO_INCREMENT|一意に決定するためのID|
|group_name|||グループ名|
|||||
|||||
|||||

### rowingkuramae:RecordItems
記録の種目を保持する。*種目とは、2000mやベンチプレスなどを指す。親となるRecordGroupを一つ持つ。

|カラム名|型|属性|説明|
|:--|:-:|:--|:--|
|item_id|INT|NOT NULL, PRIMARY KEY, AUTO_INCREMENT|一意に決定するためのID|
|item_name|||種目名|
|group_id||FOREIGN KEY|親となるRecordGroupのIDを持つ。|
|unit|||単位。記録の単位を入れる。"kg"や"s"などの文字列。|
|||||
|||||

*"エルゴ"の"2000m"と"ラン"の"2000m"は異なるタプルに入る。

### rowingkuramae:Records
毎回の記録を保持する。

|カラム名|型|属性|説明|
|:--|:-:|:--|:--|
|record_id|INT|NOT NULL, PRIMARY KEY, AUTO_INCREMENT|一意に決定するためのID|
|record_name|||種目名|
|item_id|||親となるRecordItemのIDを持つ。|
|player_id|||メニュー等を行った選手のuser_id|
|registerer_id|||記録を登録した者のuser_id。自分で登録すればplayer_idと一致するが、コックス等に登録してもらうときは一致しない。|
|result|||結果を入力する。エルゴなら"06:50,00"、ウェイトなら"50"などと入れる。|
|reps|||回数|
|||||
|||||
DB設計はもっと練る必要あり。