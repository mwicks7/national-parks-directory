import Link from 'next/link'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ img, imgHeight=240, title, subtitle, description, links, children}) {
  return (
    <Card>
      {(title || subtitle) && 
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>

          {subtitle && 
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          }
        </CardContent>
      }
      
      {img &&
        <CardMedia
          sx={{ height: imgHeight }}
          image={img}
          title={title}
        />
      }

      {description &&
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      }

      {children &&
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {children}
          </Typography>
        </CardContent>
      }

      {links && 
        <CardActions>
          {links.map(link => (
            <Button size="small" variant={link.active ? 'contained' : 'text'} component={ButtonLink} href={link.href}>{link.text}</Button>
          ))}
        </CardActions>
      }
    </Card>
  );
}

const ButtonLink = (props) => <Link {...props}>{props.children}</Link>;
