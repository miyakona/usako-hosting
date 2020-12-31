# usako

## Introduction
TBD

## Structure
TBD

## Set up
### Provision
- Install and login firebase command ( see: [https://firebase.google.com/docs/cli?hl=ja](https://firebase.google.com/docs/cli?hl=ja) ).
- Install and set up firebase emulator ( see: [https://firebase.google.com/docs/emulator-suite/install_and_configure](https://firebase.google.com/docs/emulator-suite/install_and_configure)). On set up, choose functions, pub/sub.
- Edit `.config.sample` for your config ( for development, production ) . And each rename `config.dev` `config.prd` .
- Create your service account key ( json ), and export `GOOGLE_APPLICATION_CREDENTIALS` . ( see: [https://firebase.google.com/docs/functions/local-emulator](https://firebase.google.com/docs/functions/local-emulator) )

### Apply configuration
Set
```
$ cd /path/to/usako
$ firebase functions:config:set `cat .config.{dev|prd}| tr "\n\r" " "`
```

Confirm
```
$ firebase functions:config:get
```

If you run on your emulator, you maybe need run this.
```
$ firebase functions:config:get > .runtimeconfig.json
```