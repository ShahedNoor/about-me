import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

import '../utils/colors.dart';

class MyAppBar extends StatelessWidget implements PreferredSizeWidget {
  final GlobalKey<ScaffoldState> scaffoldKey;

  const MyAppBar({super.key, required this.scaffoldKey});

  @override
  Size get preferredSize => const Size.fromHeight(80);

  @override
  Widget build(BuildContext context) {
    // Get screen size
    dynamic height = MediaQuery.sizeOf(context).height;
    dynamic width = MediaQuery.sizeOf(context).width;

    return AppBar(
      leadingWidth: width <= 370
          ? 100
          : width <= 700
              ? 130
              : 150,
      toolbarHeight: 80,
      backgroundColor: AppColor.appbarPrimary,
      leading: TextButton(
        onPressed: () {},
        child: Image.asset(
          "assets/images/header_logo/dev.noor.png",
        ),
      ),
      actions: [
        TextButton.icon(
          onPressed: () async {
            const url = 'https://github.com/ShahedNoor';
            if (await canLaunchUrl(Uri.parse(url))) {
              await launchUrl(Uri.parse(url));
            } else {
              throw 'Could not launch $url';
            }
          },
          icon: const FaIcon(
            FontAwesomeIcons.github,
            color: AppColor.whitePrimary,
          ),
          label: width >= 700
              ? const Text(
                  'Github',
                  style: TextStyle(
                    color: AppColor.whitePrimary,
                  ),
                )
              : const SizedBox.shrink(),
        ),
        TextButton.icon(
          onPressed: () async {
            const url = 'https://www.linkedin.com/in/noorshahed/';
            if (await canLaunchUrl(Uri.parse(url))) {
              await launchUrl(Uri.parse(url));
            } else {
              throw 'Could not launch $url';
            }
          },
          icon: const FaIcon(
            FontAwesomeIcons.linkedinIn,
            color: AppColor.whitePrimary,
          ),
          label: width >= 700
              ? const Text(
                  'LinkedIn',
                  style: TextStyle(
                    color: AppColor.whitePrimary,
                  ),
                )
              : const SizedBox.shrink(),
        ),
        TextButton.icon(
          onPressed: () {},
          icon: const FaIcon(
            FontAwesomeIcons.fileArrowDown,
            color: AppColor.whitePrimary,
          ),
          label: width >= 700
              ? const Text(
                  'Resume',
                  style: TextStyle(
                    color: AppColor.whitePrimary,
                  ),
                )
              : const SizedBox.shrink(),
        ),
        TextButton.icon(
          onPressed: () {
            scaffoldKey.currentState!.openEndDrawer();
          },
          icon: const Icon(
            Icons.menu_sharp,
            color: AppColor.whitePrimary,
          ),
          label: width >= 700
              ? const Text(
                  'Menu',
                  style: TextStyle(
                    color: AppColor.whitePrimary,
                  ),
                )
              : const SizedBox.shrink(),
        ),
      ],
    );
  }
}
