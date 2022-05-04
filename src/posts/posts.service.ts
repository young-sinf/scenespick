import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostReq } from './dto/create-post.dto';
import { PostEntity } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async createPost(dto: CreatePostReq) {
    const { title, contents, address } = dto;
    const post = this.buildPost(title, contents, address);
    await this.postsRepository.save(post);
  }

  private buildPost(title: string, contents: string, address: string) {
    const post = new PostEntity();
    post.title = title;
    post.contents = contents;
    post.address = address;
    return post;
  }
}
