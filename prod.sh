git pull origin dev
npm install --registry=https://registry.npm.taobao.org
npm install @shene/table
npm run build
rm -rf /www/nginx/html/table-doc-html/ && mv ./.vitepress/dist/ /www/nginx/html/table-doc-html/
