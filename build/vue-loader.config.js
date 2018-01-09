module.exports = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  postcss: [
	  require('postcss-salad')({
		  browsers: [  'last 2 versions', 'ie 9'],
		  features: {
			  "bem": {
				  defaultNamespace: undefined, // default namespace to use, none by default
				  shortcuts: {
					  utility: 'util'
				  }
			  }
		  }
	  })
  ]
}
