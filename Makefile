all:
	cd www && browser-sync start --server --files='**/*'	
watch-template:
	cd resources/ && gulp watch-template --name index --watch "/**/*" 	
	
watch-style:
	gulp watch-pcsass
watch-example-template:
	cd resources/ && gulp watch-template --name example --watch "/**/*" 	

watch-vue-template:
	cd resources/ && gulp watch-template --name vue --watch "/**/*" 		
make-vue-static:
	gulp build-static-js -d --name vue