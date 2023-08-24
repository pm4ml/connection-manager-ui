# Connection Manager UI

The connection Manager UI is a simple portal to the MCM backend.

Currently it's unable to build locally on the deprecated node 10 version, due to SASS dependency.

There's a way to run this service locally, which is using the latest docker built image:

`docker run -e AUTH_ENABLED=FALSE -e SKIP_PREFLIGHT_CHECK=true -p 8080:8080 ghcr.io/modusbox/connection-manager-ui:1.6.17`

You'll now want to run the MCM backend which is documented [here](https://github.com/pm4ml/connection-manager-api)