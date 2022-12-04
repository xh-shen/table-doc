git pull origin dev
yarn
yarn add @shene/table
yarn run build
rm -rf /www/nginx/html/table-doc-html/ && mv ./.vitepress/dist/ /www/nginx/html/table-doc-html/
