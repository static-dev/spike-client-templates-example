const tpl = require('../../views/templates/test.sgr')

const container = document.querySelector('#container')
container.innerHTML = tpl({ foo: 'hello from the template' })
