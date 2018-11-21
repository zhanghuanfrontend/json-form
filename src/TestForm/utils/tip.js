import React from 'react';
import { Icon, Tooltip} from 'antd';

const gray_text = '灰度数据验证时以该param为维度以其values拆分成多行展示数据，如选择事件category_enter的method这类param，即会将此事件拆成method=flip（滑动进入）method=click（点击进入）两行分别计算数据。请勿选择ID、duration等params！';
export const checkTip = <Tooltip placement="leftTop" title="该param将被标记为该埋点必须上传参数，一旦缺失，埋点日志将被检测列为异常不合法"><Icon type="question-circle-o" style={{ marginLeft: 5 }} /></Tooltip>;
export const grayTip = <Tooltip placement="leftTop" title={gray_text}><Icon type="question-circle-o" style={{ marginLeft: 5 }} /></Tooltip>;