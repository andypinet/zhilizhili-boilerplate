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

framework-zhilizhili-ui-framework-sasdoc:
	cd node_modules/zhilizhili-ui/framework && ../../sassdoc/bin/sassdoc src "sass"

doc:
	jsdoc gulpfile.js -d gulpfiledoc

publish-zhilizhili-ui:
	cd node_modules/zhilizhili-ui && npm publish

publish-zhilizhili-ui-plus:
	cd node_modules/zhilizhili-ui-plus && npm publish

publish-zhilizhili-ui-touch:
	cd node_modules/zhilizhili-ui-touch && npm publish
