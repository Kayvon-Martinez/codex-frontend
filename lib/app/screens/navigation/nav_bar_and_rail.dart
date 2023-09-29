import 'package:dexy/app/screens/data/view/data_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class NavBarAndRail extends StatefulWidget {
  const NavBarAndRail({super.key});

  @override
  State<NavBarAndRail> createState() => _NavBarAndRailState();
}

class _NavBarAndRailState extends State<NavBarAndRail> {
  List<Widget> destinations = const [
    Center(child: Text('Marketplace')),
    DataScreen(),
    Center(child: Text('Node')),
    Center(child: Text('Debug')),
  ];

  int selectedIndex = 0;

  PageController pageController = PageController();

  @override
  void initState() {
    super.initState();
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
      DeviceOrientation.landscapeRight,
      DeviceOrientation.landscapeLeft
    ]);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dexy'),
      ),
      body: SizedBox(
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          MediaQuery.of(context).size.width > MediaQuery.of(context).size.height
              ? NavigationRail(
                  selectedIndex: selectedIndex,
                  labelType: NavigationRailLabelType.all,
                  onDestinationSelected: (int index) {
                    setState(() {
                      selectedIndex = index;
                      pageController.jumpToPage(index);
                    });
                  },
                  groupAlignment: 0.0,
                  destinations: [
                    NavigationRailDestination(
                        icon: const Icon(Icons.store),
                        label: const Text("Marketplace"),
                        padding: EdgeInsets.symmetric(
                            vertical: MediaQuery.of(context).size.height / 30)),
                    NavigationRailDestination(
                        icon: const Icon(Icons.data_usage),
                        label: const Text("Data"),
                        padding: EdgeInsets.symmetric(
                            vertical: MediaQuery.of(context).size.height / 30)),
                    NavigationRailDestination(
                        icon: const Icon(Icons.device_hub),
                        label: const Text("Node"),
                        padding: EdgeInsets.symmetric(
                            vertical: MediaQuery.of(context).size.height / 30)),
                    NavigationRailDestination(
                        icon: const Icon(Icons.bug_report),
                        label: const Text("Debug"),
                        padding: EdgeInsets.symmetric(
                            vertical: MediaQuery.of(context).size.height / 30)),
                  ],
                )
              : Container(),
          Expanded(
            child: PageView(
              physics: const NeverScrollableScrollPhysics(),
              controller: pageController,
              children: destinations,
              onPageChanged: (int index) {
                setState(() {
                  selectedIndex = index;
                });
              },
            ),
          ),
        ]),
      ),
      bottomNavigationBar:
          MediaQuery.of(context).size.width < MediaQuery.of(context).size.height
              ? NavigationBar(
                  selectedIndex: selectedIndex,
                  onDestinationSelected: (int index) {
                    setState(() {
                      selectedIndex = index;
                      pageController.jumpToPage(index);
                    });
                  },
                  destinations: const [
                    NavigationDestination(
                      icon: Icon(Icons.store),
                      label: 'Marketplace',
                    ),
                    NavigationDestination(
                      icon: Icon(Icons.data_usage),
                      label: 'Data',
                    ),
                    NavigationDestination(
                      icon: Icon(Icons.device_hub),
                      label: 'Node',
                    ),
                    NavigationDestination(
                      icon: Icon(Icons.bug_report),
                      label: 'Debug',
                    ),
                  ],
                )
              : null,
    );
  }
}
