class PaymentAuth {
  final String txId;
  final double amount;
  final String currency;

  PaymentAuth({
    required this.txId,
    required this.amount,
    required this.currency,
  });
}

/// Simple payment gateway that can simulate failure when `shouldFail` is true.
class PaymentGateway {
  final bool shouldFail;

  PaymentGateway([this.shouldFail = false]);

  Future<PaymentAuth> authorize(Map<String, dynamic> payment) async {
    await Future.delayed(const Duration(milliseconds: 140));
    if (shouldFail) throw Exception('Payment authorization failed');
    return PaymentAuth(
      txId: 'tx-${DateTime.now().millisecondsSinceEpoch}',
      amount: payment['amount'] as double,
      currency: payment['currency'] as String,
    );
  }

  Future<void> voidPayment(String txId) async {
    await Future.delayed(const Duration(milliseconds: 60));
    return;
  }
}
