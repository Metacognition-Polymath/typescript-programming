;<ul class="list">
	<li>Homemade granola with yugurt</li>
	<li>Fantastic french toast with fruit</li>
	<li>Tortilla Espanola with salad</li>
</ul>

import React from 'react'

React.createElement(
	'ul',
	{ className: 'list' },
	React.createElement('li', null, 'Homemade granola with yugurt'),
	React.createElement('li', null, 'Fantastic french toast with fruit'),
	React.createElement('li', null, 'Tortilla Espanola with salad')
)

// tsc : {"esModuleInterop":true}
// 추가하면 import * as React from 'react'
// 대신 import React from 'react'를 해도 된다.
