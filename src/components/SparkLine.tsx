import * as React from 'react';
import {View, StyleSheet, Text, Dimensions, LayoutChangeEvent} from 'react-native';
import Svg, {Polyline} from 'react-native-svg';

interface Props {
  positive: boolean;
  children: number[];
}

interface State {
  width: number;
  height: number;
}

export default class SparkLine extends React.Component<Props, State> {
  state = {
    width: 0,
    height: 0
  }

  handleLayout: (event: LayoutChangeEvent) => void = ({nativeEvent: {layout: {width, height}}}) => {
    this.setState({
      width: width ? width : Dimensions.get('window').width,
      height
    });
  }

  render() {
    const {width, height} = this.state;
    const {positive, children}: Props = this.props;

    const maxValue = Math.max(...children);
    const minValue = Math.min(...children);
    const range = maxValue - minValue;
    const distance = width / (children.length - 1);
    const renderablePoints = children.map((v, i) => (
        {
        y: ( ( (v - minValue) * height ) / range ),
        x: distance * i + (i ? distance : 0)
        }
    )).map((v) =>  `${v.x},${-v.y + height}`);
    return (
        <View onLayout={this.handleLayout} style={styles.container}>
        {
          !width || !height ? null : (
              <Svg
                height={`${height}`}
                width={`${width}`}
              >
                <Polyline
                    points={renderablePoints.join(' ')}
                    fill="none"
                    stroke={positive ? positiveColor : negativeColor}
                    strokeWidth="1"
                />
              </Svg>
          )
        }
        </View>
    )
    }
}


const positiveColor = 'green';
const negativeColor = 'red';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  dot: {
    marginRight: 2,
    marginLeft: 2,
  },
});
