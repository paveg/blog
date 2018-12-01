.PHONY: all build deploy

DATE = $(shell date "+%Y/%m/%d %H:%M:%S")
THEMES := hugo-bootstrap-premium
BUILD_MESSAGE := "Rebuilding site at $(DATE)"
POST_MESSAGE := "Post at $(DATE)"

build:
	hugo -t $(THEMES)

publish:
	cd public; \
	git add .; \
	git commit -m $(BUILD_MESSAGE); \
	git push origin master

push.all:
	git add .
	git commit -m $(POST_MESSAGE)
	git push

deploy:
	@echo "\033[0;32mDeploying updates to GitHub...\033[0m"
	make build
	make publish
	make push.all
