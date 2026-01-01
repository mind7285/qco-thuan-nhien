// 🇻🇳 Screen danh sách quyền hạn hệ thống
// 🇺🇸 System permissions list screen
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../services/s_api_auth_adm_perm.dart';
import '../../data/models/m_tb_auth_mod.dart';

// 🇻🇳 State cho Perm List
// 🇺🇸 Perm List State
class UiAuthPermListState {
  final List<M_Tb_Auth_Mod> modules;
  final bool isLoading;
  final String? errorMessage;

  const UiAuthPermListState({
    this.modules = const [],
    this.isLoading = false,
    this.errorMessage,
  });

  UiAuthPermListState copyWith({
    List<M_Tb_Auth_Mod>? modules,
    bool? isLoading,
    String? errorMessage,
  }) {
    return UiAuthPermListState(
      modules: modules ?? this.modules,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

// 🇻🇳 Logic Notifier cho Perm List
// 🇺🇸 Perm List Logic Notifier
class UiAuthPermListLogic extends StateNotifier<UiAuthPermListState> {
  UiAuthPermListLogic() : super(const UiAuthPermListState()) {
    _loadPerms();
  }

  // ⚡️ Load danh sách permissions
  Future<void> _loadPerms() async {
    state = state.copyWith(isLoading: true, errorMessage: null);
    try {
      final service = S_Api_Auth_Adm_Perm();
      final modules = await service.list();
      state = state.copyWith(modules: modules, isLoading: false);
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
    }
  }

  // ⚡️ Reload
  Future<void> reload() => _loadPerms();

  // ⚡️ Đồng bộ quyền từ code
  Future<bool> handleSync() async {
    state = state.copyWith(isLoading: true, errorMessage: null);
    try {
      final service = S_Api_Auth_Adm_Perm();
      final result = await service.sync();
      if (result) {
        await reload();
      }
      state = state.copyWith(isLoading: false);
      return result;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
      return false;
    }
  }
}

// 🇻🇳 Provider cho Perm List Logic
// 🇺🇸 Perm List Logic Provider
final uiAuthPermListLogicProvider = StateNotifierProvider<UiAuthPermListLogic, UiAuthPermListState>(
  (ref) => UiAuthPermListLogic(),
);

// 🇻🇳 Screen Widget
// 🇺🇸 Screen Widget
class UiAuthPermListScn extends ConsumerWidget {
  const UiAuthPermListScn({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(uiAuthPermListLogicProvider);
    final logic = ref.read(uiAuthPermListLogicProvider.notifier);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Quyền hạn hệ thống'),
        actions: [
          IconButton(
            icon: const Icon(Icons.sync),
            onPressed: state.isLoading
                ? null
                : () => _handleSync(context, logic),
            tooltip: 'Đồng bộ',
          ),
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => logic.reload(),
            tooltip: 'Làm mới',
          ),
        ],
      ),
      body: state.isLoading
          ? const Center(child: CircularProgressIndicator())
          : state.errorMessage != null
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Lỗi: ${state.errorMessage}',
                        style: const TextStyle(color: Colors.red),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () => logic.reload(),
                        child: const Text('Thử lại'),
                      ),
                    ],
                  ),
                )
              : state.modules.isEmpty
                  ? const Center(child: Text('Chưa có quyền hạn nào'))
                  : ListView.builder(
                      itemCount: state.modules.length,
                      itemBuilder: (context, index) {
                        final mod = state.modules[index];
                        return _buildModuleItem(context, mod);
                      },
                    ),
    );
  }

  // 🎨 Build module item với permissions
  Widget _buildModuleItem(BuildContext context, M_Tb_Auth_Mod mod) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ExpansionTile(
        title: Text(mod.c_mod_name),
        subtitle: Text('Mã: ${mod.c_mod_code}'),
        children: (mod.perms ?? []).map((perm) {
          return ListTile(
            title: Text(perm.c_perm_name),
            subtitle: Text('Mã: ${perm.c_perm_code}'),
            leading: const Icon(Icons.check_circle_outline),
          );
        }).toList(),
      ),
    );
  }

  // ⚡️ Xử lý đồng bộ
  Future<void> _handleSync(
    BuildContext context,
    UiAuthPermListLogic logic,
  ) async {
    final result = await logic.handleSync();

    if (!context.mounted) return;

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          result
              ? 'Đã đồng bộ quyền từ hệ thống'
              : 'Lỗi khi đồng bộ quyền',
        ),
        backgroundColor: result ? Colors.green : Colors.red,
      ),
    );
  }
}

