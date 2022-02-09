# Getting Started

### `npm run setup`

Will generated .env file and install the package


### `npm start`

you will be directed to http://localhost:8001/


### `npm run build`

build for production


### `npm run clean`

remove the `/node_modules` and `/build` folder


## Folder structure

```sh
react-webapp/
├── @types                      # Define the types
├── config                      # Configuration environtment variables
├── nginx                       # Configuration for nginx
├── public                      # Default index.html
├── src                         # All component and module react web app
    ├── assets                  # Global asset
    ├── components              # Global components
    ├── context                 # Global context
    ├── helpers                 # Global helper
    ├── hooks                   # Global hooks
    ├── routes                  # Routes for each module
        ├── react        # All module of react web apps
```