import React, { Component } from 'react';
import { WindowContainer } from './styled/WindowContainer';
import { MainContainer } from './styled/MainContainer';
import { Toolbar } from '../Toolbar';
import { SidePanel } from '../SidePanel';
import { Artboard } from '../Artboard';
import { LayerItem } from '../LayerItem';
import { HistoryItem } from '../HistoryItem';
import { Cursor } from '../Cursor';
import { Tools } from '../Tools';
import { MainInner } from './styled/MainInner';
import { CREATED_ARTBOARD, VECTOR } from '../config';
import { TimelineMax, TweenMax, CSSPlugin } from 'gsap';

class Window extends Component {
  constructor() {
    super();
    this.refCursors = [null];
    this.stateCursors = [{ active: false }];
    this.state = {
      stateCursors: [{active:false}]
    }
  }

  componentDidMount() {
    TweenMax.set(this.refCursors[0], { x: 800, y: 1000 });

    let sequenceCanvas = new TimelineMax({ paused: true })
      .to({}, 0.8, {})
      .add(() => {
        TweenMax.to(this.refCursors[0], 0.8, { ease: 'Mo', x: 260, y: 140 });
      })
      .to({}, 0.8, {})
      .add(() => {
        this.state.stateCursors[0].active = true;
        this.forceUpdate();
        // TweenMax.to(this.refCursors[0], 0.8, { ease: 'Mo', x: 260, y: 140 });
      });

    sequenceCanvas.play();
  }

  render() {
    return (
      <div>
        <Cursor
          childRef={el => (this.refCursors[0] = el)}
          x={0}
          tool={VECTOR}
          active={this.state.stateCursors[0].active}
        />
        <WindowContainer>
          <Toolbar />
          <MainContainer>
            <SidePanel title="Layers">
              <LayerItem>Untitled</LayerItem>
              <LayerItem>Is how everything</LayerItem>
            </SidePanel>
            <MainInner>
              <Artboard />
              <Tools />
            </MainInner>
            <SidePanel title="History">
              <HistoryItem time={0} action={CREATED_ARTBOARD}>
                created a new artboard
              </HistoryItem>
            </SidePanel>
          </MainContainer>
        </WindowContainer>
      </div>
    );
  }
}

export { Window };
