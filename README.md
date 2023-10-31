# Sigridpunk

## Sigridpunk is and interface to [Sigrid](https://github.com/bjornregnell/sigrid) with the goal of being more user friendly.

### Getting Started

When developing locally you will work against a local sigrid server and not the public server.
The code for sigrid is included here as a submodule which will affect how you clone the repo.

#### Cloning

```
git clone --recurse-submodules git@github.com:Husenap/sigrid-interface.git
```

or

```
git clone git@github.com:Husenap/sigrid-interface.git
git submodule update --init --recursive
```

#### Starting local sigrid server

```
cd sigrid
sbt run
```

#### Starting local sigridpunk server

The project uses pnpm, see [instructions for how to install pnpm using npm](https://pnpm.io/installation#using-npm).

```
pnpm i
pnpm dev
```
