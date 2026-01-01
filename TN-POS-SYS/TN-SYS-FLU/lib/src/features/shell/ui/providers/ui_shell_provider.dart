// 🇻🇳 Provider quản lý trạng thái Shell
// 🇺🇸 Shell state management provider
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/m_tb_shell_mod.dart';
import '../../services/s_api_shell.dart';

// 🇻🇳 State cho Shell
// 🇺🇸 Shell State
class UiShellState {
  final bool isSidebarOpen;
  final String currentModule;
  final List<M_Tb_Shell_Mod> modules;
  final bool isLoading;

  const UiShellState({
    this.isSidebarOpen = true,
    this.currentModule = '',
    this.modules = const [],
    this.isLoading = false,
  });

  UiShellState copyWith({
    bool? isSidebarOpen,
    String? currentModule,
    List<M_Tb_Shell_Mod>? modules,
    bool? isLoading,
  }) {
    return UiShellState(
      isSidebarOpen: isSidebarOpen ?? this.isSidebarOpen,
      currentModule: currentModule ?? this.currentModule,
      modules: modules ?? this.modules,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

// 🇻🇳 Logic Notifier cho Shell
// 🇺🇸 Shell Logic Notifier
class UiShellLogic extends StateNotifier<UiShellState> {
  UiShellLogic() : super(const UiShellState()) {
    // Load modules khi khởi tạo
    loadModules();
  }

  // ⚡️ Load modules từ registry
  Future<void> loadModules() async {
    state = state.copyWith(isLoading: true);
    try {
      final shellService = S_Api_Shell();
      final modules = await shellService.get_registry();
      // Sort by order
      modules.sort((a, b) => a.c_order.compareTo(b.c_order));
      state = state.copyWith(modules: modules, isLoading: false);
    } catch (e) {
      state = state.copyWith(isLoading: false);
      // TODO: Handle error
    }
  }

  // ⚡️ Xử lý điều hướng module
  void handleNav(String modId) {
    state = state.copyWith(currentModule: modId);
    // TODO: Navigate to module route
  }

  // ⚡️ Toggle sidebar
  void toggleSidebar() {
    state = state.copyWith(isSidebarOpen: !state.isSidebarOpen);
  }
}

// 🇻🇳 Provider cho Shell Logic
// 🇺🇸 Shell Logic Provider
final uiShellLogicProvider = StateNotifierProvider<UiShellLogic, UiShellState>(
  (ref) => UiShellLogic(),
);

