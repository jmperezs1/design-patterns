import 'package:flutter/material.dart';
import 'appointment_facade.dart';
import 'subsystems/payment_subsystem.dart';
import 'types.dart';

class FacadeDemo extends StatefulWidget {
  const FacadeDemo({super.key});

  @override
  State<FacadeDemo> createState() => _FacadeDemoState();
}

class _FacadeDemoState extends State<FacadeDemo> {
  bool _simulateFail = false;
  bool _busy = false;
  List<String> _logs = [];
  bool? _ok;

  final Map<String, dynamic> _form = {
    'name': 'Ada Lovelace',
    'email': 'ada@math.org',
    'phone': '+57 3000000000',
    'resourceId': 'doctor-42',
    'start': DateTime.now().add(const Duration(hours: 1)).toIso8601String(),
    'end': DateTime.now().add(const Duration(hours: 2)).toIso8601String(),
    'amount': 20.0,
    'currency': 'USD',
  };

  void _setNowPlus(int hStart, int hEnd) {
    setState(() {
      _form['start'] = DateTime.now().add(Duration(hours: hStart)).toIso8601String();
      _form['end'] = DateTime.now().add(Duration(hours: hEnd)).toIso8601String();
    });
  }

  Future<void> _onBook() async {
    setState(() {
      _busy = true;
      _logs = [];
      _ok = null;
    });

    final facade = AppointmentFacade(payments: PaymentGateway(_simulateFail));

    final res = await facade.book(
      customer: Customer(name: _form['name'], email: _form['email'], phone: _form['phone']),
      slot: Slot(resourceId: _form['resourceId'], start: _form['start'], end: _form['end']),
      payment: Payment(amount: _form['amount'], currency: _form['currency']),
    );

    setState(() {
      _ok = res['ok'] as bool;
      _logs = List<String>.from(res['steps'] as List<dynamic>);
      _busy = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final badgeColor = _ok == null ? Colors.grey : _ok! ? Colors.green : Colors.red;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Card(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: cs.outlineVariant)),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Text('Facade: Reserva de Cita', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
                Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: badgeColor.withOpacity(.2), borderRadius: BorderRadius.circular(8)), child: Text(_ok == null ? 'inactivo' : _ok! ? 'éxito' : 'falló')),
              ]),
              const SizedBox(height: 8),
              Text('El cliente llama a facade.book(). La fachada orquesta CRM, Calendario, Pagos y Notificaciones — y revierte en caso de fallo.', style: Theme.of(context).textTheme.bodySmall),
              const SizedBox(height: 12),

              // Simple input fields (not full validation)
              TextField(decoration: const InputDecoration(labelText: 'Nombre completo'), controller: TextEditingController(text: _form['name']), onChanged: (v) => _form['name'] = v),
              const SizedBox(height: 6),
              TextField(decoration: const InputDecoration(labelText: 'Email'), controller: TextEditingController(text: _form['email']), onChanged: (v) => _form['email'] = v),
              const SizedBox(height: 6),
              TextField(decoration: const InputDecoration(labelText: 'Teléfono'), controller: TextEditingController(text: _form['phone']), onChanged: (v) => _form['phone'] = v),
              const SizedBox(height: 6),
              TextField(decoration: const InputDecoration(labelText: 'Recurso'), controller: TextEditingController(text: _form['resourceId']), onChanged: (v) => _form['resourceId'] = v),
              const SizedBox(height: 6),
              Row(children: [
                ElevatedButton(onPressed: () => _setNowPlus(1, 2), child: const Text('Ahora +1h → +2h')),
                const SizedBox(width: 8),
                ElevatedButton(onPressed: () => _setNowPlus(2, 3), child: const Text('Ahora +2h → +3h')),
                const SizedBox(width: 8),
                ElevatedButton(onPressed: () => _setNowPlus(24, 25), child: const Text('Mañana +1h → +2h')),
              ])
            ]),
          ),
        ),

        const SizedBox(height: 16),

        Card(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: cs.outlineVariant)),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Checkbox(value: _simulateFail, onChanged: (v) => setState(() => _simulateFail = v ?? false)),
                const SizedBox(width: 8),
                const Text('Simular fallo de pago (ver reversión)'),
              ]),
              const SizedBox(height: 8),
              Row(children: [
                ElevatedButton(onPressed: (_busy ? null : _onBook), child: Text(_busy ? 'Reservando…' : 'Reservar cita')),
                const SizedBox(width: 8),
                OutlinedButton(onPressed: () => setState(() { _logs = []; }), child: const Text('Limpiar log')),
              ]),
            ]),
          ),
        ),

        const SizedBox(height: 16),

        Text('Log', style: Theme.of(context).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
        const SizedBox(height: 8),
        Container(padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: cs.surfaceVariant.withOpacity(.06), borderRadius: BorderRadius.circular(8)), constraints: const BoxConstraints(minHeight: 120), child: _busy ? const Text('Ejecutando…') : _logs.isEmpty ? const Text('Aún no hay logs') : Column(crossAxisAlignment: CrossAxisAlignment.start, children: _logs.map((l) => Text(l)).toList())),
      ],
    );
  }
}
