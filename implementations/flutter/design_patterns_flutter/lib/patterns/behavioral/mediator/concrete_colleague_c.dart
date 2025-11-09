import 'colleague.dart';

class CategoryFilter extends Colleague {
  String value = 'all'; // 'all' | 'books' | 'tech' | 'home'
  void operationC(String newCat) {
    value = newCat;
    m.notify(this, 'C:CATEGORY_CHANGED', newCat);
  }
}
