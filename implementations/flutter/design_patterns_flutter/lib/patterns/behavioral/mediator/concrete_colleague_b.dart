import 'colleague.dart';
import 'types.dart';

class ResultsList extends Colleague {
  List<Item> view = const [];
  void operationB(List<Item> show) {
    view = List<Item>.unmodifiable(show);
    m.notify(this, 'B:RESULTS_RENDERED', show.length);
  }
}
