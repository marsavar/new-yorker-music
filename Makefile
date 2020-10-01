clean:		## delete pycache, build files
	@rm -rf build build.zip 
	@rm -rf __pycache__

## create Docker image with requirements
docker-build:	
	cd bin; unzip -u ../chromium.zip 
	docker-compose build

## run "src.lambda_function.lambda_handler" with docker-compose
## mapping "./tmp" and "./src" folders. 
## "event.json" file is loaded and provided to lambda function as event parameter  
lambda-run:	docker-build		
	docker-compose run lambda src.lambda_function.lambda_handler 

## create Docker image with requirements
docker-build:		
	docker-compose build

## run "src.lambda_function.lambda_handler" with docker-compose
## mapping "./tmp" and "./src" folders. 
## "event.json" file is loaded and provided to lambda function as event parameter  
lambda-run:			
	docker-compose run lambda src.lambda_function.lambda_handler 

## prepares build.zip archive for AWS Lambda deploy 
lambda-build: clean 
	mkdir build build/lib
	cp -r src build/.
	cp -r bin build/.
	pip3 install -r requirements.txt -t build/lib
	cd build; zip -9qr build.zip .
	cp build/build.zip .
	rm -rf build