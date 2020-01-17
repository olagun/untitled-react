import React from 'react';
import { IconContainer } from './styled/IconContainer';
import { Icon } from './styled/Icon';
import { Label } from './styled/Label';
import { IMAGE, JAY } from '../../config';
import { LayerContainer } from './styled/LayerContainer';

const LayerItem = ({ active = false, person: { color } = JAY, type = IMAGE, children }) => (
	<LayerContainer color={color} active={active}>
		<IconContainer>
			<Icon src={`${type}.svg`} />
		</IconContainer>
		<Label>{children}</Label>
	</LayerContainer>
);

export { LayerItem };
