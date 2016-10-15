'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var mkdirp = require('mkdirp');


function createImageStackLayer(self, templatePath, destinationPath) {
  self.fs.copy(
    self.templatePath(templatePath + '/Content.imageset/Contents.json'),
    self.destinationPath(destinationPath + '/Content.imageset/Contents.json')
  );
  self.fs.copy(
    self.templatePath(templatePath + '/Contents.json'),
    self.destinationPath(destinationPath + '/Contents.json')
  );
}

function createImageStack(self, templatePath, destinationPath) {
  createImageStackLayer(self, templatePath + '/Back.imagestacklayer', destinationPath + '/Back.imagestacklayer');
  createImageStackLayer(self, templatePath + '/Front.imagestacklayer', destinationPath + '/Front.imagestacklayer');
  createImageStackLayer(self, templatePath + '/Middle.imagestacklayer', destinationPath + '/Middle.imagestacklayer');
  self.fs.copy(
    self.templatePath(templatePath + '/Contents.json'),
    self.destinationPath(destinationPath + '/Contents.json')
  );
}


function createBrandAssets(self, templatePath, destinationPath) {
  createImageStack(self, templatePath + '/App\ Icon\ -\ Large.imagestack', destinationPath + '/App\ Icon\ -\ Large.imagestack');
  createImageStack(self, templatePath + '/App\ Icon\ -\ Small.imagestack', destinationPath + '/App\ Icon\ -\ Small.imagestack');
  self.fs.copy(
    self.templatePath(templatePath + '/Top\ Shelf\ Image.imageset/Contents.json'),
    self.destinationPath(destinationPath + '/Top\ Shelf\ Image.imageset/Contents.json')
  );
  self.fs.copy(
    self.templatePath(templatePath + '/Contents.json'),
    self.destinationPath(destinationPath + '/Contents.json')
  );
}

function createAssets(self) {
  createBrandAssets(self, self.templatePath('TvmlApp/Assets.xcassets/App\ Icon\ \&\ Top\ Shelf\ Image.brandassets'), self.appname + '/Assets.xcassets/App\ Icon\ \&\ Top\ Shelf\ Image.brandassets');
  self.fs.copy(
    self.templatePath('TvmlApp/Assets.xcassets/LaunchImage.launchimage/Contents.json'),
    self.destinationPath(self.appname + '/Assets.xcassets/LaunchImage.launchimage/Contents.json')
  );
  self.fs.copy(
    self.templatePath('TvmlApp/Assets.xcassets/Contents.json'),
    self.destinationPath(self.appname + '/Assets.xcassets/Contents.json')
  );
}

module.exports = generators.Base.extend({
  constructor: function () {

    generators.Base.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });

    this.option('appname', {
      desc: 'Name of the app',
      type: String,
      defaults: this.appname
    });

    this.option('appid', {
      desc: 'Id of the app',
      type: String
    });
  },

  prompting: function () {
    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('I create a scaffold for JavasScript-based TVML tvOS Apps.'));
    }

    if (this.options.appname && this.options.appid) {
      this.appname = this.options.appname;
      this.appid = this.options.appid;
      done();
    } else {

      var prompts = [{
        type: 'input',
        name: 'name',
        message: 'Your App name',
        default: this.appname
      }, {
        type: 'input',
        name: 'id',
        message: 'Your App ID',
        default: 'org.sample.tvml-app'
      }];

      this.prompt(prompts, function (answers) {
        this.appname = answers.name;
        this.appid = answers.id;
        done();
      }.bind(this));
    }

  },

  writing: {

    xcode: function () {
      mkdirp(this.appname + '/dist');

      // Xcode
      this.fs.copyTpl(
        this.templatePath('TvmlApp.xcodeproj/project.pbxproj'),
        this.destinationPath(this.appname + '.xcodeproj/project.pbxproj'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );
      this.fs.copyTpl(
        this.templatePath('TvmlApp.xcodeproj/project.xcworkspace/contents.xcworkspacedata'),
        this.destinationPath(this.appname + '.xcodeproj/project.xcworkspace/contents.xcworkspacedata'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );
      createAssets(this);

      // App
      this.fs.copyTpl(
        this.templatePath('TvmlApp/AppDelegate.swift'),
        this.destinationPath(this.appname + '/AppDelegate.swift'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );
      this.fs.copyTpl(
        this.templatePath('TvmlApp/ResourceLoader.swift'),
        this.destinationPath(this.appname + '/ResourceLoader.swift'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );
      this.fs.copyTpl(
        this.templatePath('TvmlApp/Info.plist'),
        this.destinationPath(this.appname + '/Info.plist'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );
      // Tests
      this.fs.copyTpl(
        this.templatePath('TvmlAppTests/TvmlAppTests.swift'),
        this.destinationPath(this.appname + 'Tests/' + this.appname + 'Tests.swift'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );
      this.fs.copyTpl(
        this.templatePath('TvmlAppTests/Info.plist'),
        this.destinationPath(this.appname + 'Tests/Info.plist'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );
      // UITests
      this.fs.copyTpl(
        this.templatePath('TvmlAppUITests/TvmlAppUITests.swift'),
        this.destinationPath(this.appname + 'UITests/' + this.appname + 'UITests.swift'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );
      this.fs.copyTpl(
        this.templatePath('TvmlAppUITests/Info.plist'),
        this.destinationPath(this.appname + 'UITests/Info.plist'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );
    },

    gruntfile: function () {
      this.fs.copyTpl(
        this.templatePath('TvmlApp/Gruntfile.js'),
        this.destinationPath(this.appname + '/Gruntfile.js'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );
    },

    webpack: function () {
      this.fs.copyTpl(
        this.templatePath('TvmlApp/webpack.config.js'),
        this.destinationPath(this.appname + '/webpack.config.js'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('TvmlApp/_package.json'),
        this.destinationPath(this.appname + '/package.json'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );
    },

    git: function () {
      this.fs.copyTpl(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'),
        {
          appname: this.appname,
          appid: this.appid
        }
      );

      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes')
      );
    },

    editorConfig: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    scripts: function () {
      this.fs.copy(
        this.templatePath('TvmlApp/src/application.js'),
        this.destinationPath(this.appname + '/src/application.js')
      );
    },

    templates: function () {
      this.fs.copy(
        this.templatePath('TvmlApp/src/templates/loading.jade'),
        this.destinationPath(this.appname + '/src/templates/loading.jade')
      );
      this.fs.copy(
        this.templatePath('TvmlApp/src/templates/list.jade'),
        this.destinationPath(this.appname + '/src/templates/list.jade')
      );
    }
  },

  install: function () {
    var elementDir = process.cwd() + '/' + this.appname;
    process.chdir(elementDir);
    this.installDependencies({
      bower: false,
      npm: true,
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install']
    });
  },

  end: function () {
    var howToInstall =
      '\nPlease run ' +
      chalk.yellow.bold('npm install') +
      '.';

    if (this.options['skip-install']) {
      this.log(howToInstall);
      return;
    }
    this.log(yosay('Run ' + chalk.yellow.bold('cd ' + this.appname + ' && npm start') + ' to start local dev server with reload. Then Start the app from Xcode.'));
  }
});
