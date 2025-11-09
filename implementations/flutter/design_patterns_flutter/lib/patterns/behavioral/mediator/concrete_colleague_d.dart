import 'colleague.dart';

class ClearButton extends Colleague {
  void operationD() {
    m.notify(this, 'D:CLEAR_ALL');
  }
}
