from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('input_forms', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userinformation',
            old_name='hash_key',
            new_name='case_id',
        ),
    ]
