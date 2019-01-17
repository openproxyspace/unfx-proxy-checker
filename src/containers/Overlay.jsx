import React from 'react';
import OverlayIp from '../components/OverlayIp';
import OverlayJudges from '../components/OverlayJudges';
import { connect } from 'react-redux';

const Overlay = ({ ip, judges }) => [<OverlayIp key="ip" {...ip} />, <OverlayJudges key="judges" {...judges} />];

export default connect(state => ({ ...state.overlay }))(Overlay);
