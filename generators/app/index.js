'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fileToRead = require('html-wiring');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cool ' + chalk.red('generator-aspnet-angular') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var path1 = 'Web.config';
    var hook1 = '</system.webServer>';
    var file1 = fileToRead.readFileAsString(path1);
    var insert1 = '<staticContent> \n <mimeMap fileExtension=".json" mimeType="application/json" /> \n </staticContent> \n <rewrite> \n <rules> \n <rule name="vendor redirection" stopProcessing="true"> \n <match url="^(.*)/(bower_components)/(.*)" ignoreCase="false" /> \n <conditions logicalGrouping="MatchAll"> \n <add input="{HTTP_HOST}" pattern="localhost" negate="false"/> \n </conditions> \n <action type="Rewrite" url="./bower_components/{R:3}" redirectType="Permanent" /> \n </rule> \n <rule name="styles redirection" stopProcessing="true"> \n <match url="^(.*)/(styles)/(.*)" ignoreCase="false" /> \n <conditions logicalGrouping="MatchAll"> \n <add input="{HTTP_HOST}" pattern="localhost" negate="false"/> \n </conditions> \n <action type="Rewrite" url=".tmp/styles/{R:3}" redirectType="Permanent" /> \n </rule>\n <rule name="AngularJS Routes" stopProcessing="true"> \n <match url=".*" /> \n <conditions logicalGrouping="MatchAll"> \n <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" /> \n <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" /> \n <add input="{REQUEST_URI}" pattern="^/(api)" negate="true" /> \n </conditions> \n <action type="Rewrite" url="/home" /> \n </rule> \n </rules> \n </rewrite>';

    var path2 = 'App_Start/RouteConfig.cs';
    var hook2 = 'routes.IgnoreRoute("{resource}.axd/{*pathInfo}");';
    var file2 = fileToRead.readFileAsString(path2);
    var insert2 = 'routes.MapRoute( \n name: "Home", \n url: "home", \n defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional } \n    );\n \n routes.MapRoute( \n name: "About", \n url: "about", \n defaults: new { controller = "About", action = "Index", id = UrlParameter.Optional } \n    );';

    if (file1.indexOf(insert1) === -1) {
      this.writeFileFromString(file1.replace(hook1, insert1 + '\n' + hook1), path1);
    }

    if (file2.indexOf(insert2) === -1) {
      this.writeFileFromString(file2.replace(hook2, hook2 + '\n' + insert2), path2);
    }
    this.fs.copy(
      this.templatePath('_tmp/'),
      this.destinationPath('.tmp/')
    );
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'), {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('_bowerrc'),
      this.destinationPath('.bowerrc')
    );
    this.fs.copy(
      this.templatePath('_editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('_gitattributes'),
      this.destinationPath('.gitattributes')
    );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_Gruntfile.js'),
      this.destinationPath('Gruntfile.js')
    );
    this.fs.copy(
      this.templatePath('_icomoon.20160712-232503.zip'),
      this.destinationPath('icomoon.20160712-232503.zip')
    );
    this.fs.copy(
      this.templatePath('_jscsrc'),
      this.destinationPath('.jscsrc')
    );
    this.fs.copy(
      this.templatePath('_jshintrc'),
      this.destinationPath('.jshintrc')
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('_yo-rc.json'),
      this.destinationPath('.yo-rc.json')
    );

    this.fs.copy(
      this.templatePath('app/'),
      this.destinationPath('app/')
    );
    this.fs.copyTpl(
      this.templatePath('app/index.html'),
      this.destinationPath('app/index.html'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('app/scripts/'),
      this.destinationPath('app/scripts/'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('test/'),
      this.destinationPath('test/'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('Controllers/'),
      this.destinationPath('Controllers/'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('Views/'),
      this.destinationPath('Views/'), {
        name: this.props.name
      }
    );
  },

  install: function () {
    this.installDependencies();
  }
});
