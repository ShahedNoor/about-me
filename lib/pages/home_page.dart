import 'package:about_me/utils/colors.dart';
import 'package:flutter/material.dart';

import '../components/app_drawer.dart';
import '../components/my_appbar.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: AppColor.backgroundPrimary,
      endDrawer: AppDrawer(),
      appBar: MyAppBar(
        scaffoldKey: _scaffoldKey,
      ),
      body: Container(),
    );
  }
}
