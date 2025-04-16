// Author: Fizz.kang
// .stylelintrc.cjs

module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue'
  ],
  plugins: ['stylelint-order', 'stylelint-scss'],
  overrides: [
    {
      files: ['**/*.(scss|css|html|vue)'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    'font-family-name-quotes': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'order/properties-alphabetical-order': null,
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'flex-wrap',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'text-justify',
      'text-align',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': ['tailwind', 'apply']
      }
    ],
  }
}
