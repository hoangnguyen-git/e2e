FROM selenium/node-chrome-debug:latest
LABEL authors=yahyaozturk

USER seluser

#====================================
# Scripts to run Selenium Standalone
#====================================

RUN sudo apt-get update
RUN sudo apt-get -y install build-essential
RUN sudo apt-get -y install curl git
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
ENV NPM_CONFIG_LOGLEVEL warn

COPY . /protractor/

WORKDIR /protractor/
RUN sudo npm install
RUN sudo npm install -g protractor
RUN sudo webdriver-manager update


COPY entry_point.sh /opt/bin/entry_point.sh

EXPOSE 4444
EXPOSE 5900
