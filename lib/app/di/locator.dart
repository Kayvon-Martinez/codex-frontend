import 'package:dexy/app/screens/data/repository/data_repo.dart';
import 'package:dexy/app/screens/data/repository/data_repo_impl.dart';
import 'package:get_it/get_it.dart';

final GetIt locator = GetIt.instance;
Future<void> setupLocator() async {
  locator.registerFactory<DataRepository>(() => DataRepositoryImpl());
}
