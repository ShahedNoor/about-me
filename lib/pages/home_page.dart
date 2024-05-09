import 'package:about_me/components/my_appbar.dart';
import 'package:about_me/utils/colors.dart';
import 'package:flutter/material.dart';

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
      endDrawer: Drawer(
        child: ListView(
          // Add content to the drawer
          children: [
            ListTile(
              title: Text('Item 1'),
              onTap: () {},
            ),
            ListTile(
              title: Text('Item 2'),
              onTap: () {},
            ),
          ],
        ),
      ),
      appBar: MyAppBar(
        scaffoldKey: _scaffoldKey,
      ),
      body: Container(),
    );
  }
}
