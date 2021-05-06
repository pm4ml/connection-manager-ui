import { PureComponent } from 'react';
import { Toast } from 'components';

class SuccessToast extends PureComponent {
  componentDidUpdate(nextProps) {
    if (this.props.isVisible) {
      Toast.show({
        kind: 'success',
        closeable: true,
        title: 'Saved Successfully',
      });
    }
  }

  render() {
    return null;
  }
}

export default SuccessToast;
