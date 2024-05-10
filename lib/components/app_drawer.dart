import 'package:about_me/utils/colors.dart';
import 'package:flutter/material.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: AppColor.backgroundPrimary,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            // Top logo
            Row(
              children: [
                TextButton(
                  onPressed: () {},
                  child: Image.asset(
                    "assets/images/header_logo/dev.noor.png",
                    height: 100,
                    width: 100,
                  ),
                ),
              ],
            ),
            // Menu section
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: TextButton.icon(
                    onPressed: () {},
                    icon: const Icon(
                      Icons.home,
                      color: AppColor.whitePrimary,
                    ),
                    label: const Text(
                      'Home',
                      style: TextStyle(
                        color: AppColor.whitePrimary,
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: TextButton.icon(
                    onPressed: () {},
                    icon: const Icon(
                      Icons.account_circle_outlined,
                      color: AppColor.whitePrimary,
                    ),
                    label: const Text(
                      'About',
                      style: TextStyle(
                        color: AppColor.whitePrimary,
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: TextButton.icon(
                    onPressed: () {},
                    icon: const Icon(
                      Icons.code,
                      color: AppColor.whitePrimary,
                    ),
                    label: const Text(
                      'Recent Projects',
                      style: TextStyle(
                        color: AppColor.whitePrimary,
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: TextButton.icon(
                    onPressed: () {},
                    icon: const Icon(
                      Icons.contact_support,
                      color: AppColor.whitePrimary,
                    ),
                    label: const Text(
                      'Contact Me',
                      style: TextStyle(
                        color: AppColor.whitePrimary,
                      ),
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
