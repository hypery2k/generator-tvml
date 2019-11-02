# TVML Yeoman Template

[![Greenkeeper badge](https://badges.greenkeeper.io/hypery2k/generator-tvml.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/hypery2k/generator-tvml.svg?branch=master)](https://travis-ci.org/hypery2k/generator-tvml) [![npm version](https://badge.fury.io/js/generator-tvml.svg)](http://badge.fury.io/js/generator-tvml) [![Code Climate](https://codeclimate.com/github/hypery2k/generator-tvml/badges/gpa.svg)](https://codeclimate.com/github/hypery2k/generator-tvml) [![Dependency Status](https://david-dm.org/hypery2k/generator-tvml.svg)](https://david-dm.org/hypery2k/generator-tvml) [![devDependency Status](https://david-dm.org/hypery2k/generator-tvml/dev-status.svg)](https://david-dm.org/hypery2k/generator-tvml#info=devDependencies)

> The template provides a basic TVML sceleton for tvOS which uses WebPack and LiveReloading to build apps for the AppleTV platform

[![NPM](https://nodei.co/npm/generator-tvml.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/generator-tvml/)

> Feel free to **donate**
>
> <a href='https://pledgie.com/campaigns/31915'><img alt='Click here to lend your support to: NPM packages and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/31915.png?skin_name=chrome' border='0' ></a>
> <a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JYG6LVEHB59TL">
> <img alt="" border="0" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"/>
> </img></a>
> Or donate [Bitcoins](bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D):
> [![Bitcoin](https://martinreinhardt-online.de/bitcoin.png)](bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D)
>
> Also via [greenaddress](https://greenaddress.it/pay/GA3ZPfh7As3Gc2oP6pQ1njxMij88u/)

## Usage

```
(sudo) npm install -g yo generator-tvml
yo tvml
```

Or the develop build, which maybe **not be stable**
```
(sudo) npm install -g yo generator-tvml@next
yo tvml
```



## About
This is a basic template which uses [atvjs](https://www.npmjs.com/package/atvjs) framework for blazing fast [Apple TV](https://developer.apple.com/tvos/) application development using pure JavaScript. It relies on the [tvOS](https://developer.apple.com/tvos/) provided [TVML](https://developer.apple.com/library/prerelease/tvos/documentation/LanguagesUtilities/Conceptual/ATV_Template_Guide/) and [TVJS](https://developer.apple.com/library/prerelease/tvos/documentation/TVMLJS/Reference/TVJSFrameworkReference/) for [Apple TV development](https://developer.apple.com/library/tvos/documentation/General/Conceptual/AppleTV_PG/). However this framework does most of the heavy lifting for you and lets you concentrate on your application logic without worrying about the hassles of complicated architecture for Apple TV development. Build your Apple TV application the same way how you are used to building your SPA applications in JavaScript and let the framework handle the rest for you.

This template also includes livereloading and modules with WebPack and ES2015.

Feel free to **donate**

<a href='http://www.pledgie.com/campaigns/31915'><img alt='Click here to lend your support to: NPM packages and make a donation at www.pledgie.com !' src='http://www.pledgie.com/campaigns/31915.png?skin_name=chrome' border='0' /></a>
<a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=D88ZDNH6AANPJ">
<img alt="" border="0" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"/>
</img></a>


## Creating Pages
Create pages in your application using the page factory. You will then be able to navigate to these pages using the name of the page.
```
ATV.Page.create({
	name: 'home',
	// use a template function from your favourite templating engine
	// or pass a raw template function
	template(data) {
		return `<document>
					<alertTemplate>
						<title>${data.title}</title>
						<description>${data.description}</description>
					</alertTemplate>
				</document>`;
	},
	// pass some raw data to be applied
	// or a data function that returns the data
	data: {
		title: 'Homepage',
		description: 'This is my super awesome homepage created using atvjs.'
	}
});

// later in your application you can do something like below to navigate to the page
ATV.Navigation.navigate('home');
```

Or you can use the jade loader:


```
import alertTemplate from './templates/alert.jade';

ATV.Page.create({
	name: 'home',
	// use a template function from your favourite templating engine
	// or pass a raw template function
	template: alertTemplate,
	// pass some raw data to be applied
	// or a data function that returns the data
	data: {
		title: 'Homepage',
		description: 'This is my super awesome homepage created using atvjs.'
	}
});

// later in your application you can do something like below to navigate to the page
ATV.Navigation.navigate('home');
```
