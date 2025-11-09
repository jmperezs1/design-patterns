import 'colleague.dart';

class SearchBox extends Colleague {
  String value = "";
  void operationA(String newValue) {
    value = newValue;
    m.notify(this, 'A:SEARCH_CHANGED', newValue);
  }
}
