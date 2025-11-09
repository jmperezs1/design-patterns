abstract class FormTemplate {
  /// Orchestrates the submit flow. Returns a success message or throws on error.
  Future<String> submit(Map<String, dynamic> formData) async {
    final cleanData = validate(formData);

    final result = await send(cleanData);

    await afterSuccess(result);

    return successMessage(result);
  }

  Map<String, dynamic> validate(Map<String, dynamic> data);

  Future<dynamic> send(Map<String, dynamic> cleanData);

  Future<void> afterSuccess(dynamic result);

  String successMessage(dynamic result);
}
