import 'package:dexy/app/di/locator.dart';
import 'package:dexy/app/screens/data/view_model/data_view_model.dart';
import 'package:dexy/app/screens/navigation/nav_bar_and_rail.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'app/screens/data/repository/data_repo.dart';

Future<void> main() async {
  setupLocator();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(
            create: (_) => DataViewModel(locator<DataRepository>())),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dexy',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: const ColorScheme.dark(
          primary: Colors.deepPurple,
          secondary: Colors.indigo,
        ),
        useMaterial3: true,
      ),
      home: const NavBarAndRail(),
    );
  }
}
