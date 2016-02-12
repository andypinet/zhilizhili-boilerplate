all:
	cd www && browser-sync start --server --files='**/*'	
watch-template:
	cd resources/ && gulp watch-template --name index --watch "/**/*" 	
	
watch-style:
	gulp watch-pcsass
watch-example-template:
	cd resources/ && gulp watch-template --name example --watch "/**/*"
example-static:
	gulp build-static-js -d --name example

watch-vue-template:
	cd resources/ && gulp watch-template --name vue --watch "/**/*" 		
vue-static:
	gulp build-static-js -d --name vue
update:
	npm update zhilizhili-ui zhilizhili-ui-plus zhilizhili-ui-touch

pc-sassdoc:
	cd resources/assets/pc && ../../../node_modules/sassdoc/bin/sassdoc src "sass"