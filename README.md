# jinryu

## 人流センサーデータ

- PUSHかんたんオープンデータ [種別](https://push.sabae.cc/#type=https://push.sabae.cc/1003) [集約データCSV](https://push.sabae.cc/1005.csv)

### 設定方法

1. MixServerに登録
2. iccidを[PUSHかんたんオープンデータ 人流センサー](https://push.sabae.cc/#type=https://push.sabae.cc/1003)に登録
3. 登録したパスコード付きURLを[qrmaker](https://code4fukui.github.io/qrmaker/)などでQRコードにして、デバイス所有者に渡す
4. デバイス所有者に、エリア名、設置場所などを編集してもらう
5. 本稼働したidを[人流センサー集約データ](https://push.sabae.cc/1005)のIDsに空白なしコンマ区切りで追記する（管理者のみ）

## daily backup with [MixSoda-util](https://github.com/code4fukui/MixSoda-util/)

### setup

```sh
mkdir .github
mkdir .github/workflows
cat > .github/workflows/scheduled-backup.yml
```

```yml
name: Scheduled 

on:
  schedule:
    # 1:31分に実行 1(JST)-9+24=16(UTC)
    - cron: '31 16 * * *'

jobs:
  build:
    name: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x
      - name: make
        env:
          SECRET_CODE: ${{ secrets.code }}
        run: |
          deno run -A https://code4fukui.github.io/MixSoda-util/backup.js $SECRET_CODE
      - name: commit and push
        run: |
          git config --global user.email "workflow@example.com"
          git config --global user.name "workflow user"
          git add .
          git commit -m 'update data' && git push ${REPO} HEAD:${{github.event.pull_request.head.ref}} || true
          git push
```

## MixServer

すべてのMixSoda:
```
GET http://mixsoda.io:2048/(token).csv[オプション]
```

特定のMixSoda:
```
GET http://mixsoda.io:2048/(token)/(ICCID).csv[オプション]
```

- [reference | mixsoda.io](https://mixsoda.io/reference.html)

