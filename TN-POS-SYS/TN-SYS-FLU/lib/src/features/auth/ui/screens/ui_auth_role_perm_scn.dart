// 🇻🇳 Screen phân quyền cho vai trò
// 🇺🇸 Role permissions screen
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../services/s_api_auth_adm_perm.dart';
import '../../services/s_api_auth_adm_role.dart';
import '../../data/models/m_tb_auth_mod.dart';

// 🇻🇳 State cho Role Perm
// 🇺🇸 Role Perm State
class UiAuthRolePermState {
  final String roleId;
  final String roleName;
  final List<M_Tb_Auth_Mod> modules;
  final Set<String> selectedPermIds;
  final bool isLoading;
  final String? errorMessage;

  const UiAuthRolePermState({
    required this.roleId,
    required this.roleName,
    this.modules = const [],
    this.selectedPermIds = const {},
    this.isLoading = false,
    this.errorMessage,
  });

  UiAuthRolePermState copyWith({
    String? roleId,
    String? roleName,
    List<M_Tb_Auth_Mod>? modules,
    Set<String>? selectedPermIds,
    bool? isLoading,
    String? errorMessage,
  }) {
    return UiAuthRolePermState(
      roleId: roleId ?? this.roleId,
      roleName: roleName ?? this.roleName,
      modules: modules ?? this.modules,
      selectedPermIds: selectedPermIds ?? this.selectedPermIds,
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

// 🇻🇳 Logic Notifier cho Role Perm
// 🇺🇸 Role Perm Logic Notifier
class UiAuthRolePermLogic extends StateNotifier<UiAuthRolePermState> {
  UiAuthRolePermLogic(String roleId, String roleName)
      : super(UiAuthRolePermState(roleId: roleId, roleName: roleName)) {
    Future.microtask(() => reload());
  }

  // ⚡️ Load data
  Future<void> reload() async {
    state = state.copyWith(isLoading: true, errorMessage: null);
    try {
      // Load modules và permissions
      final permService = S_Api_Auth_Adm_Perm();
      final modules = await permService.list();

      // TODO: Load selected permissions từ role hiện tại
      // Tạm thời để empty set
      final selectedPermIds = <String>{};

      state = state.copyWith(
        modules: modules,
        selectedPermIds: selectedPermIds,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
    }
  }

  // ⚡️ Toggle permission
  void togglePerm(String permId) {
    final newSet = Set<String>.from(state.selectedPermIds);
    if (newSet.contains(permId)) {
      newSet.remove(permId);
    } else {
      newSet.add(permId);
    }
    state = state.copyWith(selectedPermIds: newSet);
  }

  // ⚡️ Lưu phân quyền
  Future<bool> handleSave() async {
    state = state.copyWith(isLoading: true, errorMessage: null);

    try {
      final roleService = S_Api_Auth_Adm_Role();
      final permIds = state.selectedPermIds.toList();
      final result = await roleService.save_perms(state.roleId, permIds);

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

// 🇻🇳 Provider cho Role Perm Logic (Family Provider với parameters)
// 🇺🇸 Role Perm Logic Provider (Family Provider with parameters)
final uiAuthRolePermLogicProvider = StateNotifierProvider.family<UiAuthRolePermLogic, UiAuthRolePermState, ({String roleId, String roleName})>(
  (ref, params) => UiAuthRolePermLogic(params.roleId, params.roleName),
);

// 🇻🇳 Screen Widget
// 🇺🇸 Screen Widget
class UiAuthRolePermScn extends ConsumerWidget {
  const UiAuthRolePermScn({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final args = ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
    final roleId = args?['roleId'] as String? ?? '';
    final roleName = args?['roleName'] as String? ?? '';

    if (roleId.isEmpty) {
      return const Scaffold(
        body: Center(child: Text('Thiếu thông tin vai trò')),
      );
    }

    final params = (roleId: roleId, roleName: roleName);
    final state = ref.watch(uiAuthRolePermLogicProvider(params));
    final logic = ref.read(uiAuthRolePermLogicProvider(params).notifier);

    return Scaffold(
      appBar: AppBar(
        title: Text('Phân quyền: $roleName'),
        actions: [
          IconButton(
            icon: const Icon(Icons.save),
            onPressed: state.isLoading
                ? null
                : () => _handleSave(context, logic, state),
            tooltip: 'Lưu',
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
                        return _buildModuleItem(context, mod, state, logic);
                      },
                    ),
    );
  }

  // 🎨 Build module item với permissions
  Widget _buildModuleItem(
    BuildContext context,
    M_Tb_Auth_Mod mod,
    UiAuthRolePermState state,
    UiAuthRolePermLogic logic,
  ) {
    return ExpansionTile(
      title: Text(mod.c_mod_name),
      subtitle: Text('Mã: ${mod.c_mod_code}'),
      children: (mod.perms ?? []).map((perm) {
        final isSelected = state.selectedPermIds.contains(perm.q_id);
        return CheckboxListTile(
          title: Text(perm.c_perm_name),
          subtitle: Text('Mã: ${perm.c_perm_code}'),
          value: isSelected,
          onChanged: (_) => logic.togglePerm(perm.q_id),
        );
      }).toList(),
    );
  }

  // ⚡️ Xử lý lưu
  Future<void> _handleSave(
    BuildContext context,
    UiAuthRolePermLogic logic,
    UiAuthRolePermState state,
  ) async {
    final result = await logic.handleSave();

    if (!context.mounted) return;

    if (result) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Đã lưu phân quyền thành công'),
          backgroundColor: Colors.green,
        ),
      );
      Navigator.of(context).pop(true);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Lỗi: ${state.errorMessage ?? 'Không xác định'}'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }
}

